const EN_CONTENT = {
  brandName: 'Casino A',
  home: {
    title: 'Casino A',
    description: 'Welcome to Casino A – Enjoy exclusive games!',
  },
  header: {
    title: 'Casino A',
    pages: [
      {
        title: 'casino',
        description: 'Welcome to Casino A – Enjoy exclusive games!',
        link: '/casino',
      },
      {
        title: 'liveCasino',
        description: 'Welcome to Casino A – Enjoy exclusive games!',
        link: '/live-casino',
      },
      {
        title: 'My Profile',
        description: 'Welcome to Casino A – Enjoy exclusive games!',
        link: '/my-profile',
        isLoggedIn: true,
      },
    ],
    buttons: {
      login: {
        text: 'Login',
        link: '/login',
      },
      logout: {
        text: 'Logout',
        link: '/logout',
      },
    },
  },
  loginPage: {
    headerTitle: 'Log in to Casino A',
    title: 'Log in',
    button: 'Log in',
    userName: 'Username',
    password: 'Password',
    usernameError: 'Please enter a valid username',
    passwordError: 'Password must be at least 8 characters long.',
    invalidCredentials: 'Invalid username or password',
  },
  modal: {
    id: '1',
    title: "It's a Casino Day",
    description: '100% bonus up to €500 cash',
    subDescription: 'Brand Casino A, EN Content',
    buttonText: 'Close',
  },
};

const CA_CONTENT = {
  brandName: 'Casino A',
  home: {
    title: 'Casino A',
    description: 'Bienvenue au Casino A – Profitez de jeux exclusifs !',
  },
  header: {
    title: 'Casino A',
    pages: [
      {
        title: 'casino',
        description: 'Bienvenue au Casino A – Profitez de jeux exclusifs !',
        link: '/casino',
      },
      {
        title: 'live Casino',
        description: 'Bienvenue au Casino A – Profitez de jeux exclusifs !',
        link: '/live-casino',
      },
      {
        title: 'My Profile',
        description: 'Bienvenue au Casino A – Profitez de jeux exclusifs !',
        link: '/my-profile',
        isLoggedIn: true,
      },
    ],
    buttons: {
      login: {
        text: 'Login',
        link: '/login',
      },
      logout: {
        text: 'Logout',
        link: '/logout',
      },
    },
  },
  loginPage: {
    headerTitle: 'Log in to Casino A',
    title: 'Log in',
    button: 'Log in',
    userName: 'Username',
    password: 'Password',
    usernameError: 'Please enter a valid username',
    passwordError: 'Password must be at least 8 characters long.',
    invalidCredentials: 'Invalid username or password',
  },
  modal: {
    id: '1',
    title: "C'est une journée de casino",
    description: 'Bonus de 100 % jusqu à 500 € en espèces',
    subDescription: 'Brand Casino A, CA Content',
    buttonText: 'Fermer',
  },
};

export const Content = {
  en: EN_CONTENT,
  ca: CA_CONTENT,
};
