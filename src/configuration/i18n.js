import i18next from "i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {register, regitser} from 'timeago.js'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        //Navbar İtems
        "Sign Up": "Sign Up",
        Login: "Login",

        //Login Form İtems
        "User Name": "User Name",
        "Full Name": "Full Name",
        Password: "Password",
        "Password Repeat": "Password Repeat",
        "Want to join Spring social?":"Want to join Spring social?",
        "Register now":"Register now.",
        "Do you have an account?":"Do you have an account?",

        //SignIn İtems
        Profile: "Profile",
        Settings: "Settings",
        "Log Out": "Log Out",

        //Login Response Message İtems
        Unauthorized: "Unauthorized",
        "Successfully added": "Registration successful",
        "Failed added": "Registration unsuccessful",

        //Home İtems
        "Discover spring social": "Discover spring social",
        "social media": "social media",
        "Chat with your friends, share and do much more with Spring social media. To do all this, create an account now and enjoy spring social media":
          "Chat with your friends, share and do much more with Spring social media. To do all this, create an account now and enjoy spring social media",
        "There is no limit to what you can do with Spring":
          "There is no limit to what you can do with Spring",

        //User Page
        "Edit profile":"Edit Profile",

        //Modal Button component
        "Updated":"Updated",
        "Profile image":"Profile image",
        "Edit Profile":"Edit Profile",
        "Close":"Close",
        "UnauthorizedUpdate": "The password is incorrect ",

        //Error Page
        "Oops!":"Oops!",
        "404 Not Found":"404 Not Found",
        "Sorry, an error has occured, Requested page not found!":"Sorry, an error has occured, Requested page not found!",
        "Take Me Home":"Take Me Home",
        "Contact Support":"Contact Support",

        
        //FlowsList Component
        "Upload old posts":"Upload old posts",
        "There are new posts":"There are new posts",
        "You haven't shared a post yet":"You haven't shared a post yet",

        //Share Posts Component
        "Share":"Share",

        //Validations errors
        "Validations errors update" : "This username already taken",
        "Successfully updated" : "Successfully updated",
        "Failed updated":"Failed updated",

        //Login Form Error Messages İtems
        USER_NAME_CAN_NOT_BE_NULL:
          process.env.REACT_APP_USER_NAME_CAN_NOT_BE_NULL,
        USERNAME_MUST_BE_AT_LEAST_3_CHARACTERS:
          process.env.REACT_APP_USERNAME_MUST_BE_AT_LEAST_3_CHARACTERS,
        USERNAME_MUST_BE_UP_TO_255_CHARACTERS:
          process.env.REACT_APP_USERNAME_MUST_BE_UP_TO_255_CHARACTERS,
        FULL_NAME_CAN_NOT_BE_NULL:
          process.env.REACT_APP_FULL_NAME_CAN_NOT_BE_NULL,
        FULL_NAME_MUST_BE_AT_LEAST_1_CHARACTERS:
          process.env.REACT_APP_FULL_NAME_MUST_BE_AT_LEAST_1_CHARACTERS,
        FULL_NAME_MUST_BE_AT_LEAST_255_CHARACTERS:
          process.env.REACT_APP_FULL_NAME_MUST_BE_AT_LEAST_255_CHARACTERS,
        PASSWORD_CAN_NOT_BE_NULL:
          process.env.REACT_APP_PASSWORD_CAN_NOT_BE_NULL,
        PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS:
          process.env.REACT_APP_PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS,
        PASSWORD_MUST_BE_UP_TO_32_CHARACTERS:
          process.env.REACT_APP_PASSWORD_MUST_BE_UP_TO_32_CHARACTERS,
        PASSWORD_PATTERN_MESSAGE:
          process.env.REACT_APP_PASSWORD_PATTERN_MESSAGE,
        PASSWORDS_DO_NOT_MATCH: process.env.REACT_APP_PASSWORDS_DO_NOT_MATCH,
        PASSWORD_AUTHORIZATION: process.env.REACT_APP_PASSWORD_AUTHORIZATION,
      },
    },
    tr: {
      translations: {
        //Navbar İtems
        "Sign Up": "Kayıt Ol",
        Login: "Giriş Yap",

        //Login Form İtems
        "User Name": "Kullanıcı Adı",
        "Full Name": "Tam Ad",
        Password: "Şifre",
        "Password Repeat": "Şifre Tekrarı",
        "Want to join Spring social?":"Spring sosyal'e katılmak ister misiniz?",
        "Register now":"Şimdi kaydolun.",
        "Do you have an account?":"Hesabınız var mı?",

        //SignIn İtems
        Profile: "Profil",
        Settings: "Ayarlar",
        "Log Out": "Çıkış Yap",
        "UnauthorizedUpdate": "Şifre hatalı",


        //Home İtems
        "Discover spring social": "Spring sosyali keşfet",
        "social media": "sosyal medya",
        "Chat with your friends, share and do much more with Spring social media. To do all this, create an account now and enjoy spring social media":
          "Spring sosyal medyası ile arkadaşlarınızla sohbet edin, paylaşın ve çok daha fazlasını yapın. Tüm bunları yapmak için şimdi bir hesap oluşturun ve bahar sosyal medyasının keyfini çıkarın",
        "There is no limit to what you can do with Spring":
          "Spring ile yapabileceklerinizin sınırı yok",

         //User Page
         "Edit Profile":"Profili düzenle",

         //Modal Button component
        "Updated":"Güncelle",
        "Profile image":"Profil resmi",
        "Edit Profile":"Profili düzenle",
        "Close":"Kapat",

        //Error Page
        "Oops!":"Hata!",
        "404 Not Found":"404 Sayfa bulunamadı",
        "Sorry, an error has occured, Requested page not found!":"Üzgünüz, bir hata oluştu, istek tamamlanamadı!",
        "Take Me Home":"Anasayfaya git",
        "Contact Support":"Destek ile iletişime geç",

        //Login Response Message İtems
        Unauthorized: "Kullanıcı adı veya şifre hatalı",
        "Successfully added": "Kayıt Başarılı",
        "Failed added": "Kayıt Başarısız",

        //FlowsList Component
        "Upload old posts":"Eski gönderileri yükle",
        "There are new posts":"Yeni gönderiler var",
        "You haven't shared a post yet":"Henüz bir gönderi paylaşmadın",

         //Share Posts Component
         "Share":"Paylaş",

         //Validations errors
         "Validations errors update" : "Bu kullanıcı adını alamazsınız",
         "Successfully updated" : "Güncellendi",
         "Failed updated":"Başarısız",
        

        //Login Form Error Messages İtems
        USER_NAME_CAN_NOT_BE_NULL:
          process.env.REACT_APP_USER_NAME_CAN_NOT_BE_NULL_TR,
        USERNAME_MUST_BE_AT_LEAST_3_CHARACTERS:
          process.env.REACT_APP_USERNAME_MUST_BE_AT_LEAST_3_CHARACTERS_TR,
        USERNAME_MUST_BE_UP_TO_255_CHARACTERS:
          process.env.REACT_APP_USERNAME_MUST_BE_UP_TO_255_CHARACTERS_TR,
        FULL_NAME_CAN_NOT_BE_NULL:
          process.env.REACT_APP_FULL_NAME_CAN_NOT_BE_NULL_TR,
        FULL_NAME_MUST_BE_AT_LEAST_1_CHARACTERS:
          process.env.REACT_APP_FULL_NAME_MUST_BE_AT_LEAST_1_CHARACTERS_TR,
        FULL_NAME_MUST_BE_AT_LEAST_255_CHARACTERS:
          process.env.REACT_APP_FULL_NAME_MUST_BE_AT_LEAST_255_CHARACTERS_TR,
        PASSWORD_CAN_NOT_BE_NULL:
          process.env.REACT_APP_PASSWORD_CAN_NOT_BE_NULL_TR,
        PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS:
          process.env.REACT_APP_PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS_TR,
        PASSWORD_MUST_BE_UP_TO_32_CHARACTERS:
          process.env.REACT_APP_PASSWORD_MUST_BE_UP_TO_32_CHARACTERS_TR,
        PASSWORD_PATTERN_MESSAGE:
          process.env.REACT_APP_PASSWORD_PATTERN_MESSAGE_TR,
        PASSWORDS_DO_NOT_MATCH: process.env.REACT_APP_PASSWORDS_DO_NOT_MATCH_TR,
        PASSWORD_AUTHORIZATION: process.env.REACT_APP_PASSWORD_AUTHORIZATION_TR,
      },
    },
  },
  fallbackLng: "tr",
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    wait: "true",
  },
});


const timeageTr = (number, index) => {
  return [
    ['az önce', 'şimdi'],
    ['%s saniye önce', '%s saniye içinde'],
    ['1 dakika önce', '1 dakika içinde'],
    ['%s dakika önce', '%s dakika içinde'],
    ['1 saat önce', '1 saat içinde'],
    ['%s saat önce', '%s saat içinde'],
    ['1 gün önce', '1 gün içinde'],
    ['%s gün önce', '%s gün içinde'],
    ['1 hafta önce', '1 hafta içinde'],
    ['%s hafta önce', '%s hafta içinde'],
    ['1 ay önce', '1 ay içinde'],
    ['%s ay önce', '%s ay içinde'],
    ['1 yıl önce', '1 yıl içinde'],
    ['%s yıl önce', '%s yıl içinde'],
  ][index]
}
register('tr',timeageTr)

export default i18n;
