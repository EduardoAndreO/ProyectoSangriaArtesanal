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
        "register": "Register",
        "register_success_title": "Registration Successful",
        "register_success_message": "Your account has been created.",
        "errors": {
          "email_required": "Email is required",
          "email_invalid": "Invalid email",
          "phone_required": "Phone is required",
          "phone_invalid": "Invalid phone",
          "password_required": "Password is required",
          "password_min": "Min 6 characters",
          "register_failed_title": "Registration Failed"
        }
      },
      "home": {
        "logout": "Log Out",
        "product_title": "Our Star Sangrias",
        "select_language": "Select your language",
        "products": [
          {
            "name": "Strawberry & Mint Sangria",
            "description": "Refreshing sangria with strawberries, mint leaves, and a citrus touch.",
            "price": "$16.99",
            "image": "sangria_fresa.png"
          },
          {
            "name": "Tropical Citrus Sangria",
            "description": "A vibrant blend of orange, lemon, and pineapple with artisanal wine.",
            "price": "$17.99",
            "image": "sangria_citrica.png"
          },
          {
            "name": "Mango & Passionfruit Sangria",
            "description": "Exotic mango and passionfruit with a sweet, fresh finish.",
            "price": "$18.99",
            "image": "sangria_mango.png"
          },
          {
            "name": "Premium Classic Sangria",
            "description": "An artisanal blend of red wine, fresh seasonal fruits, and a secret touch of spices.",
            "price": "$18.99",
            "image": "sangria_clasica.png"
          },
          {
            "name": "Red Berries Sangria",
            "description": "A festival of strawberries, raspberries, and blueberries in every glass.",
            "price": "$19.99",
            "image": "sangria_frutosrojos.png"
          }
        ],
        "add_to_cart": "Add to Cart"
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
        "register": "Registrarse",
        "register_success_title": "Registro Exitoso",
        "register_success_message": "Tu cuenta ha sido creada.",
        "errors": {
          "email_required": "Email es requerido",
          "email_invalid": "Email no válido",
          "phone_required": "Teléfono es requerido",
          "phone_invalid": "Teléfono no válido",
          "password_required": "Contraseña requerida",
          "password_min": "Min 6 caracteres",
          "register_failed_title": "Error de Registro"
        }
      },
      "home": {
        "logout": "Cerrar sesión",
        "product_title": "Nuestras Sangrías Estrella",
        "select_language": "Selecciona tu idioma",
        "products": [
          {
            "name": "Sangría Fresa & Menta",
            "description": "Refrescante sangría con fresas, hojas de menta y un toque cítrico.",
            "price": "$16.99",
            "image": "sangria_fresa.png"
          },
          {
            "name": "Sangría Cítrica Tropical",
            "description": "Mezcla vibrante de naranja, limón y piña con vino artesanal.",
            "price": "$17.99",
            "image": "sangria_citrica.png"
          },
          {
            "name": "Sangría Mango & Maracuyá",
            "description": "Exótica de mango y maracuyá con un final dulce y fresco.",
            "price": "$18.99",
            "image": "sangria_mango.png"
          },
          {
            "name": "Sangría Clásica Artesanal",
            "description": "Mezcla artesanal de vino tinto, frutas frescas y un toque secreto de especias.",
            "price": "$18.99",
            "image": "sangria_clasica.png"
          },
          {
            "name": "Sangría Frutos Rojos",
            "description": "Festival de fresas, frambuesas y arándanos en cada copa.",
            "price": "$19.99",
            "image": "sangria_frutosrojos.png"
          }
        ],
        "add_to_cart": "Añadir al Carrito"
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
        "register": "S'inscrire",
        "register_success_title": "Inscription Réussie",
        "register_success_message": "Votre compte a été créé.",
        "errors": {
          "email_required": "Email est requis",
          "email_invalid": "Email invalide",
          "phone_required": "Téléphone est requis",
          "phone_invalid": "Téléphone invalide",
          "password_required": "Mot de passe est requis",
          "password_min": "Min 6 caractères",
          "register_failed_title": "Échec de l'inscription"
        }
      },
      "home": {
        "logout": "Déconnexion",
        "product_title": "Nos Sangrias Vedettes",
        "select_language": "Sélectionnez votre langue",
        "products": [
          {
            "name": "Sangria Fraise & Menthe",
            "description": "Sangria rafraîchissante avec fraises, feuilles de menthe et touche d'agrumes.",
            "price": "16,99 $",
            "image": "sangria_fresa.png"
          },
          {
            "name": "Sangria Agrumes Tropicale",
            "description": "Mélange vibrant d'orange, citron et ananas avec vin artisanal.",
            "price": "17,99 $",
            "image": "sangria_citrica.png"
          },
          {
            "name": "Sangria Mangue & Passion",
            "description": "Mangue exotique et fruit de la passion avec une finale douce et fraîche.",
            "price": "18,99 $",
            "image": "sangria_mango.png"
          },
          {
            "name": "Sangria Classique Premium",
            "description": "Mélange artisanal de vin rouge, fruits frais et touche secrète d'épices.",
            "price": "18,99 $",
            "image": "sangria_clasica.png"
          },
          {
            "name": "Sangria Fruits Rouges",
            "description": "Festival de fraises, framboises et myrtilles dans chaque verre.",
            "price": "19,99 $",
            "image": "sangria_frutosrojos.png"
          }
        ],
        "add_to_cart": "Ajouter au Panier"
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