import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "login": {
        "email": "Email",
        "phone": "Phone",
        "password": "Password",
        "submit": "Log In",
        "errors": {
          "email_required": "Email is required",
          "email_invalid": "Invalid email",
          "phone_required": "Phone is required",
          "phone_invalid": "Invalid phone",
          "password_required": "Password is required",
          "password_min": "Min 6 characters"
        }
      },
      "home": {
        "logout": "Log Out",
        "product_title": "Our Star Product",
        "select_language": "Select your language",
        "product": {
          "name": "Premium Classic Sangria",
          "description": "An artisanal blend of red wine, fresh seasonal fruits, and a secret touch of spices.",
          "price": "$18.99",
          "add_to_cart": "Add to Cart"
        }
      }
    }
  },
  es: {
    translation: {
      "login": {
        "email": "Correo electrónico",
        "phone": "Teléfono",
        "password": "Contraseña",
        "submit": "Iniciar sesión",
        "errors": {
          "email_required": "Email es requerido",
          "email_invalid": "Email no válido",
          "phone_required": "Teléfono es requerido",
          "phone_invalid": "Teléfono no válido",
          "password_required": "Contraseña requerida",
          "password_min": "Min 6 caracteres"
        }
      },
      "home": {
        "logout": "Cerrar sesión",
        "product_title": "Nuestro Producto Estrella",
        "select_language": "Selecciona tu idioma",
        "product": {
          "name": "Sangría Clásica Premium",
          "description": "Una mezcla artesanal de vino tinto, frutas frescas de temporada y un toque secreto de especias.",
          "price": "$18.99",
          "add_to_cart": "Añadir al Carrito"
        }
      }
    }
  },
  fr: {
    translation: {
      "login": {
        "email": "Email",
        "phone": "Téléphone",
        "password": "Mot de passe",
        "submit": "Connexion",
        "errors": {
          "email_required": "Email est requis",
          "email_invalid": "Email invalide",
          "phone_required": "Téléphone est requis",
          "phone_invalid": "Téléphone invalide",
          "password_required": "Mot de passe est requis",
          "password_min": "Min 6 caractères"
        }
      },
      "home": {
        "logout": "Déconnexion",
        "product_title": "Notre Produit Phare",
        "select_language": "Sélectionnez votre langue",
        "product": {
          "name": "Sangria Classique Premium",
          "description": "Un mélange artisanal de vin rouge, de fruits frais de saison et d'une touche secrète d'épices.",
          "price": "18,99 $",
          "add_to_cart": "Ajouter au Panier"
        }
      }
    }
  }
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: 'es', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;