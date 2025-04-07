const dd = {
  brandName: "Casino B",
  home: {
    title: "Casino B",
    description: "Welcome to Casino B – Enjoy exclusive games!",
  },
  header: {
    title: "Casino B",
    pages: [
      {
        title: "casino",
        description: "Welcome to Casino B – Enjoy exclusive games!",
        link: "/casino",
      },
      {
        title: "liveCasino",
        description: "Welcome to Casino B – Enjoy exclusive games!",
        link: "/live-casino",
      },
      {
        title: "My Profile",
        description: "Welcome to Casino B – Enjoy exclusive games!",
        link: "/my-profile",
        isLoggedIn: true,
      },
    ],
    buttons: {
      login: {
        text: "Login",
        link: "/login",
      },
      logout: {
        text: "Logout",
        link: "/logout",
      },
    },
  },
  loginPage: {
    headerTitle: "Log in to Casino B",
    title: "Log in",
    button: "Log in",
    userName: "Username",
    password: "Password",
    usernameError: "Please enter a valid username",
    passwordError: "Password must be at least 8 characters long.",
    invalidCredentials: "Invalid username or password",
  },
  modal: {
    id: "1",
    title: "It's a Casino Day",
    description: "100% bonus up to €500 cash",
    subDescription: "+ 100 Free Spins on Book of Dead",
    buttonText: "Close",
  },
};

export const Content = {
  home: {
    title: "Casino B",
    description: "Welcome to Casino B – Enjoy exclusive games!",
  },
  en: dd,
  ca: dd,
};
