import i18next from "i18next";
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
  
    resources:{
        
        en:{
            translations:{
                
                "Sign Up":"Sign Up",
                "User Name" :"User Name",
                "Full Name" :"Full Name",
                "Password" :"Password",
                "Password Repeat" :"Password Repeat",
                "Login":"Login",
                "Unauthorized":"Unauthorized",
                "Successfully added":"Registration successful",
                "Failed added":"Registration unsuccessful",

                USER_NAME_CAN_NOT_BE_NULL:process.env.REACT_APP_USER_NAME_CAN_NOT_BE_NULL,
                USERNAME_MUST_BE_AT_LEAST_3_CHARACTERS:process.env.REACT_APP_USERNAME_MUST_BE_AT_LEAST_3_CHARACTERS,
                USERNAME_MUST_BE_UP_TO_255_CHARACTERS:process.env.REACT_APP_USERNAME_MUST_BE_UP_TO_255_CHARACTERS,

                FULL_NAME_CAN_NOT_BE_NULL:process.env.REACT_APP_FULL_NAME_CAN_NOT_BE_NULL,
                FULL_NAME_MUST_BE_AT_LEAST_1_CHARACTERS:process.env.REACT_APP_FULL_NAME_MUST_BE_AT_LEAST_1_CHARACTERS,
                FULL_NAME_MUST_BE_AT_LEAST_255_CHARACTERS:process.env.REACT_APP_FULL_NAME_MUST_BE_AT_LEAST_255_CHARACTERS,

                PASSWORD_CAN_NOT_BE_NULL:process.env.REACT_APP_PASSWORD_CAN_NOT_BE_NULL,
                PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS:process.env.REACT_APP_PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS,
                PASSWORD_MUST_BE_UP_TO_32_CHARACTERS:process.env.REACT_APP_PASSWORD_MUST_BE_UP_TO_32_CHARACTERS,
                PASSWORD_PATTERN_MESSAGE:process.env.REACT_APP_PASSWORD_PATTERN_MESSAGE,
                PASSWORDS_DO_NOT_MATCH:process.env.REACT_APP_PASSWORDS_DO_NOT_MATCH,
            }
        },
        tr:{
            translations:{
                "Sign Up":"Kayıt Ol",
                "User Name" :"Kullanıcı Adı",
                "Full Name" :"Tam Ad",
                "Password" :"Şifre",
                "Password Repeat" :"Şifre Tekrarı",
                "Login":"Giriş Yap",
                "Unauthorized":"Kullanıcı adı veya şifre hatalı",
                "Successfully added":"Kayıt Başarılı",
                "Failed added":"Kayıt Başarısız",

                USER_NAME_CAN_NOT_BE_NULL:process.env.REACT_APP_USER_NAME_CAN_NOT_BE_NULL_TR,
                USERNAME_MUST_BE_AT_LEAST_3_CHARACTERS:process.env.REACT_APP_USERNAME_MUST_BE_AT_LEAST_3_CHARACTERS_TR,
                USERNAME_MUST_BE_UP_TO_255_CHARACTERS:process.env.REACT_APP_USERNAME_MUST_BE_UP_TO_255_CHARACTERS_TR,

                FULL_NAME_CAN_NOT_BE_NULL:process.env.REACT_APP_FULL_NAME_CAN_NOT_BE_NULL_TR,
                FULL_NAME_MUST_BE_AT_LEAST_1_CHARACTERS:process.env.REACT_APP_FULL_NAME_MUST_BE_AT_LEAST_1_CHARACTERS_TR,
                FULL_NAME_MUST_BE_AT_LEAST_255_CHARACTERS:process.env.REACT_APP_FULL_NAME_MUST_BE_AT_LEAST_255_CHARACTERS_TR,

                PASSWORD_CAN_NOT_BE_NULL:process.env.REACT_APP_PASSWORD_CAN_NOT_BE_NULL_TR,
                PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS:process.env.REACT_APP_PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS_TR,
                PASSWORD_MUST_BE_UP_TO_32_CHARACTERS:process.env.REACT_APP_PASSWORD_MUST_BE_UP_TO_32_CHARACTERS_TR,
                PASSWORD_PATTERN_MESSAGE:process.env.REACT_APP_PASSWORD_PATTERN_MESSAGE_TR,
                PASSWORDS_DO_NOT_MATCH:process.env.REACT_APP_PASSWORDS_DO_NOT_MATCH_TR,
            }
        }
    },
    fallbackLng:'tr',
    ns:['translations'],
    defaultNS:'translations',
    keySeparator:false,
    interpolation:{
        escapeValue:false,
        formatSeparator:','
    },
    react:{
        wait:'true'
    }
});

export default i18n;


