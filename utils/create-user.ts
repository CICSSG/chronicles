export async function createUser(formData: FormData): Promise<any> {
  const apiEndpoint = "/api/createuser";

  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const res = await fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        skip_password_checks: true,
      }),
    });
    const response = await res.json();
    return response.message;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteUser(formData: FormData): Promise<any> {
  const apiEndpoint = "/api/deleteuser";

  const userId = formData.get("userId");

  try {
    const res = await fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify({
        user_id: userId
      }),
    });
    const response = await res.json();
    return response.message;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
