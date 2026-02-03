
import API from "../axios/API";
import Auth from "../modules/Auth";

export const login = async (email, password) => {
  console.log("Entrou no serverRequest login", email, " ", password);

  return await API({
    method: "POST",
    url: "/api/auth/login",
    data: { email, password }
  }).then((res) => {
    // Seu back retorna: { token, user: {...} }
    Auth.setUserToken({
      token: res.data.token,
      user_id: res.data.user.id,
      ...res.data.user
    });
    return res;
  });
};

export const register = async (fullname, email, password, verifyPassword) => {
  return await API({
    method: "POST",
    url: "/api/auth/register",
    data: { full_name: fullname, email, password }

  }).then(res => {
    // Auth.setUserToken(res.data.user_token);
    console.log(res);
    return res;
  });
};
