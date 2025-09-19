import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { signIn, getStoredAuth, refreshIfNeeded } from '../services/GoogleAuth';
import type { AuthorizeResult } from 'react-native-app-auth';
import { useTranslation } from 'react-i18next';

type CalendarEvent = {
  id: string;
  summary?: string;
  start?: {
    dateTime?: string;
    date?: string;
  };
};

export default function CalendarScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [auth, setAuth] = useState<AuthorizeResult | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const stored = await getStoredAuth();
        if (stored) {
          const valid = await refreshIfNeeded(stored);
          setAuth(valid);
          if (valid?.accessToken) {
            await loadEvents(valid.accessToken);
          }
        }
      } catch (e: unknown) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSignIn(): Promise<void> {
    setLoading(true);
    try {
      const res = await signIn();
      setAuth(res);
      if (res.accessToken) {
        await loadEvents(res.accessToken);
      }
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
        setErr(e.message);
      } else {
        setErr(String(e));
      }
    } finally {
      setLoading(false);
    }
  }

  async function loadEvents(accessToken: string): Promise<void> {
    setLoading(true);
    try {
      const timeMin = new Date().toISOString();
      const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(
        timeMin,
      )}&maxResults=20&singleEvents=true&orderBy=startTime`;
      const resp = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`HTTP ${resp.status}: ${text}`);
      }
      const json = await resp.json();
      setEvents(json.items || []);
    } catch (e: unknown) {
      console.error('loadEvents error', e);
      if (e instanceof Error) {
        setErr(e.message);
      } else {
        setErr(String(e));
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading && !events.length) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      {auth ? (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>📅 Eventos próximos</Text>
            <Button title="Actualizar" onPress={() => auth.accessToken && loadEvents(auth.accessToken)} />
          </View>
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.eventCard}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTitle}>{item.summary || '(sin título)'}</Text>
                </View>
                <View style={styles.eventDetails}>
                  <Text style={styles.eventDate}>
                    📅 {item.start?.dateTime ? new Date(item.start.dateTime).toLocaleString('es-ES') : item.start?.date || 'Fecha no disponible'}
                  </Text>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>📭 No hay eventos próximos</Text>
                <Text style={styles.emptySubtext}>Tus próximos eventos aparecerán aquí</Text>
              </View>
            }
            contentContainerStyle={styles.listContainer}
          />
        </>
      ) : (
        <View style={styles.authContainer}>
          <Text style={styles.authTitle}>🔐 Acceso a Calendario</Text>
          <Text style={styles.authDescription}>
            Inicia sesión con tu cuenta de Google para ver tus eventos próximos
          </Text>
          <Button title="Iniciar sesión con Google" onPress={handleSignIn} />
          {err ? <Text style={styles.errorText}>{err}</Text> : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventHeader: {
    marginBottom: 6,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  authTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  authDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 12,
    color: 'red',
    fontWeight: '600',
  },
});
