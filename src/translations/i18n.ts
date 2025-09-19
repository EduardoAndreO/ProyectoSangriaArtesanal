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
        "add_to_cart": "Add to Cart",
        "cart": {
          "title": "My Cart",
          "empty": "Your cart is empty! How about adding one of our delicious sangrias?",
          "total": "Total to pay",
          "clear_cart": "Empty cart",
          "proceed_payment": "Pay now!"
        },
        "calendar": {
          "title": "Calendar",
          "connect_google": "Connect to Google Calendar",
          "disconnect": "Disconnect",
          "events": "Your Events",
          "no_events": "No events found",
          "loading": "Loading events...",
          "error": "Error loading events"
        },
        "payment": {
          "title": "Secure Payment",
          "subtitle": "Enter your card details",
          "order_summary": "Your order summary",
          "total": "Total to pay",
          "card_holder_name": "Cardholder Name",
          "card_number": "Card Number (16 digits)",
          "expiry_date": "MM/YY",
          "cvv": "CVV",
          "security_note": "Your data is 100% secure with SSL encryption",
          "processing": "Processing your payment...",
          "pay_now": "Confirm payment!",
          "back_to_cart": "Back to cart",
          "error_title": "Error",
          "fill_all_fields": "Please fill in all fields",
          "invalid_card_number": "The card number is not valid",
          "invalid_cvv": "The CVV code is not valid",
          "success_title": "Payment successful!",
          "success_message": "Thank you for your purchase! Total paid: €{{total}}"
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
        "add_to_cart": "Añadir al Carrito",
        "cart": {
          "title": "Mi Carrito",
          "empty": "¡Tu carrito está vacío! ¿Qué te parece añadir alguna de nuestras deliciosas sangrías?",
          "total": "Total a pagar",
          "clear_cart": "Vaciar carrito",
          "proceed_payment": "¡Pagar ahora!"
        },
        "calendar": {
          "title": "Calendario",
          "connect_google": "Conectar con Google Calendar",
          "disconnect": "Desconectar",
          "events": "Tus Eventos",
          "no_events": "No se encontraron eventos",
          "loading": "Cargando eventos...",
          "error": "Error al cargar eventos"
        },
        "payment": {
          "title": "Pago Seguro",
          "subtitle": "Ingresa los datos de tu tarjeta",
          "order_summary": "Resumen de tu pedido",
          "total": "Total a pagar",
          "card_holder_name": "Nombre del titular",
          "card_number": "Número de tarjeta (16 dígitos)",
          "expiry_date": "MM/YY",
          "cvv": "CVV",
          "security_note": "Tus datos están 100% seguros con encriptación SSL",
          "processing": "Procesando tu pago...",
          "pay_now": "¡Confirmar pago!",
          "back_to_cart": "Volver al carrito",
          "error_title": "Error",
          "fill_all_fields": "Por favor completa todos los campos",
          "invalid_card_number": "El número de tarjeta no es válido",
          "invalid_cvv": "El código CVV no es válido",
          "success_title": "¡Pago exitoso!",
          "success_message": "¡Gracias por tu compra! Total pagado: €{{total}}"
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
        "add_to_cart": "Ajouter au Panier",
        "cart": {
          "title": "Mon Panier",
          "empty": "Votre panier est vide ! Que diriez-vous d'ajouter une de nos délicieuses sangrias ?",
          "total": "Total à payer",
          "clear_cart": "Vider le panier",
          "proceed_payment": "Payer maintenant !"
        },
        "calendar": {
          "title": "Calendrier",
          "connect_google": "Se connecter à Google Calendar",
          "disconnect": "Déconnecter",
          "events": "Vos Événements",
          "no_events": "Aucun événement trouvé",
          "loading": "Chargement des événements...",
          "error": "Erreur lors du chargement des événements"
        },
        "payment": {
          "title": "Paiement Sécurisé",
          "subtitle": "Entrez les détails de votre carte",
          "order_summary": "Résumé de votre commande",
          "total": "Total à payer",
          "card_holder_name": "Nom du Titulaire",
          "card_number": "Numéro de Carte (16 chiffres)",
          "expiry_date": "MM/AA",
          "cvv": "CVV",
          "security_note": "Vos données sont 100% sécurisées avec chiffrement SSL",
          "processing": "Traitement de votre paiement...",
          "pay_now": "Confirmer le paiement !",
          "back_to_cart": "Retour au panier",
          "error_title": "Erreur",
          "fill_all_fields": "Veuillez remplir tous les champs",
          "invalid_card_number": "Le numéro de carte n'est pas valide",
          "invalid_cvv": "Le code CVV n'est pas valide",
          "success_title": "Paiement réussi !",
          "success_message": "Merci pour votre achat ! Total payé : €{{total}}"
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