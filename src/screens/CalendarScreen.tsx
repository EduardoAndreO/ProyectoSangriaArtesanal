import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { getStoredAuth, refreshIfNeeded } from '../services/GoogleAuth';
import { minimalSignIn } from '../services/MinimalGoogleAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthorizeResult } from 'react-native-app-auth';
import { useTranslation } from 'react-i18next';
import CustomButton from '../components/CustomButton';

type CalendarEvent = {
  id: string;
  summary?: string;
  start?: {
    dateTime?: string;
    date?: string;
  };
};

const futureSangriaEvents = [
  {
    summary: 'Lanzamiento: Sangría de Maracuyá Tropical',
    description: '¡Prepárate para un viaje al trópico! Lanzamiento oficial de nuestra nueva sangría de maracuyá.',
  },
  {
    summary: 'Degustación Exclusiva: Sangría de Frutos Rojos del Bosque',
    description: 'Evento privado para miembros. Degusta nuestra nueva creación antes que nadie.',
  },
  {
    summary: 'Próximamente: Sangría Blanca con Toques de Pera y Lichi',
    description: 'Un sabor elegante y refrescante. Anota la fecha para el anuncio oficial.',
  },
  {
    summary: 'Noche de Cata: Edición Especial Sangría Rosada',
    description: 'Descubre los secretos de nuestra sangría rosada de edición limitada en una noche de cata guiada.',
  },
  {
    summary: 'Anuncio: Sangría de Mango y Chile Ancho',
    description: 'Una combinación atrevida y deliciosa. ¡No te pierdas el gran anuncio!',
  },
  {
    summary: 'Clase Maestra: El Arte de la Sangría Perfecta',
    description: 'Aprende a preparar nuestras sangrías más famosas con nuestros mixólogos expertos.',
  },
  {
    summary: 'Brunch & Sangría: Edición Fin de Semana',
    description: 'Disfruta de un brunch especial maridado con una selección de nuestras mejores sangrías.',
  },
  {
    summary: 'Preventa Exclusiva: Sangría de Invierno (Edición Especiada)',
    description: 'Accede a la preventa de nuestra sangría de invierno, con notas de canela, naranja y clavo.',
  },
  {
    summary: 'Happy Hour 2x1: Todas Nuestras Sangrías de Autor',
    description: '¡Tarde de amigos! Disfruta de nuestra promoción 2x1 en todas las sangrías de la casa.',
  },
  {
    summary: 'Concurso: ¡Crea tu Propia Sangría!',
    description: 'Participa en nuestro concurso anual. La sangría ganadora formará parte de nuestro menú de verano.',
  },
];

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
      await AsyncStorage.removeItem('@miapp:google_auth');
      const res = await minimalSignIn();
      setAuth(res);
      if (res.accessToken) {
        await loadEvents(res.accessToken);
      }
    } catch (e: unknown) {
      console.error('handleSignIn error', JSON.stringify(e, Object.getOwnPropertyNames(e)));
      if (e instanceof Error) {
        if (e.message.includes('User cancelled flow')) {
          setErr('Inicio de sesión cancelado por el usuario.');
        } else {
          setErr(e.message);
        }
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
      const resp = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`HTTP ${resp.status}: ${text}`);
      }
      const json = await resp.json();
      setEvents(json.items || []);
    } catch (e: unknown) {
      console.error('loadEvents error', JSON.stringify(e, Object.getOwnPropertyNames(e)));
      if (e instanceof Error) setErr(e.message);
      else setErr(String(e));
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateEvent(accessToken: string): Promise<void> {
    setLoading(true);
    try {
      const randomEventIndex = Math.floor(Math.random() * futureSangriaEvents.length);
      const eventDetails = futureSangriaEvents[randomEventIndex];
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 30) + 1);
      const eventDate = futureDate.toISOString().split('T')[0];

      const event = {
        summary: eventDetails.summary,
        description: eventDetails.description,
        start: { date: eventDate },
        end: { date: eventDate },
      };

      const resp = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`HTTP ${resp.status}: ${text}`);
      }

      Alert.alert('Éxito', `¡Evento "${event.summary}" creado correctamente!`);
      await loadEvents(accessToken);
    } catch (e: unknown) {
      console.error('handleCreateEvent error', JSON.stringify(e, Object.getOwnPropertyNames(e)));
      if (e instanceof Error) setErr(e.message);
      else setErr(String(e));
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteEvent(accessToken: string, eventId: string): Promise<void> {
    setLoading(true);
    try {
      const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`;
      const resp = await fetch(url, { method: 'DELETE', headers: { Authorization: `Bearer ${accessToken}` } });

      if (resp.status !== 204) {
        const text = await resp.text();
        throw new Error(`HTTP ${resp.status}: ${text}`);
      }

      Alert.alert('Éxito', 'Evento eliminado correctamente.');
      await loadEvents(accessToken);
    } catch (e: unknown) {
      console.error('handleDeleteEvent error', JSON.stringify(e, Object.getOwnPropertyNames(e)));
      if (e instanceof Error) {
        if (e.message.includes('eventTypeRestriction')) {
          Alert.alert(
            'Error al eliminar',
            'No se puede borrar este evento. Los eventos automáticos (como cumpleaños o festivos) no se pueden eliminar desde la aplicación.',
          );
        } else {
          setErr(e.message);
        }
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
          <Text style={styles.title}>📅 Eventos próximos</Text>
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.eventCard}>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{item.summary || '(sin título)'}</Text>
                  <Text style={styles.eventDate}>
                    📅 {item.start?.dateTime ? new Date(item.start.dateTime).toLocaleString('es-ES') : item.start?.date || 'Fecha no disponible'}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => auth.accessToken && handleDeleteEvent(auth.accessToken, item.id)}>
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
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
          <View style={styles.bottomActions}>
            <CustomButton title="Crear Evento" onPress={() => auth.accessToken && handleCreateEvent(auth.accessToken)} variant="primary" />
            <CustomButton title="Actualizar" onPress={() => auth.accessToken && loadEvents(auth.accessToken)} variant="secondary" />
          </View>
        </>
      ) : (
        <View style={styles.authContainer}>
          <Text style={styles.authTitle}>🔐 Acceso a Calendario</Text>
          <Text style={styles.authDescription}>Inicia sesión con tu cuenta de Google para ver tus eventos próximos</Text>
          <CustomButton title="Iniciar sesión con Google" onPress={handleSignIn} />
          {err ? <Text style={styles.errorText}>{err}</Text> : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
  },
  deleteButtonText: {
    fontSize: 24,
    marginLeft: 16,
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
    paddingBottom: 100, // Espacio para la barra de acciones inferior
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
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
