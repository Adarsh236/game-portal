import { UserLoginPage } from '@game-portal/shared/modules/login';

import { BRANDS } from '@game-portal/constants/brands';

const LoginPage: React.FC = () => {
  return <UserLoginPage brandId={BRANDS.CASINO_B} />;
};

export default LoginPage;
