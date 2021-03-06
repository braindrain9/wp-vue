import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'uk',
  fallbackLocale: 'uk',
  messages: {
    en: {
      about: 'about me',
      allAchievements: 'All achievements are',
      back: 'back',
      backToHome: 'Back to home',
      cases: 'cases',
      close: 'close',
      contactUs: 'contact us',
      detailed: 'more detailed',
      here: 'here',
      howToFindUs: 'how to find us?',
      home: 'home',
      myCompleteBio: 'My <br> complete <span class="orange-color">bio</span>',
      myCompleteBioText: 'My complete bio',
      menu: 'Menu',
      notFound: 'The page you are looking for does not exist.',
      ourCases: 'our cases',
      ourPartners: 'our partners',
      ourServices: 'our services',
      partners: 'partners',
      services: 'services',
      updatedAt: 'last updated on'
    },
    uk: {
      about: 'про мене',
      allAchievements: 'Усі напрацювання',
      back: 'назад',
      backToHome: 'Повернутись на головну',
      cases: 'кейси',
      close: 'закрити',
      contactUs: 'напишіть нам листа',
      detailed: 'детальніше',
      here: 'тут',
      howToFindUs: 'де нас знайти?',
      home: 'на головну',
      myCompleteBio: 'Моя <br> повна <span class="orange-color">біографія</span>',
      myCompleteBioText: 'Моя повна біографія',
      menu: 'Меню',
      notFound: 'Сторінка, яку Ви шукаєте, не існує.',
      ourCases: 'наші кейси',
      ourPartners: 'наші партнери',
      ourServices: 'наші послуги',
      partners: 'партнери',
      services: 'послуги',
      updatedAt: 'останній апдейт'
    }
  }
});