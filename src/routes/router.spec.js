const app = require("../../app");
const request = require("supertest");
describe("API Test", () => {
  it("API-> / : should get 200 requests", async () => {
    const response = await request(app.callback()).get("/");
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toMatchObject({
      version: "1.0.0",
      baseUrl: "/oauth",
      postUrl: "https://oauth.lemonnard.com",
    });
  });

  it("API-> oauth/token: should get 200 requests", async () => {
    const response = await request(app.callback())
      .post("/oauth/token")
      .set("Authorization", "Basic MTIzNDU2OjEyMzQ1Ng==")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({
        username: "admin",
        password: "a0bc807b86bce3e63ad621eec41c3eb5",
        grant_type: "password",
        scope: "web",
      });
    expect(response.status).toBe(200);
  });

  it("API-> oauth/token: should get 400 requests", async () => {
    const response = await request(app.callback())
      .post("/oauth/token")
      .set("Authorization", "Basic MTIzNDU2OjEyMzQ1N==")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({
        username: "admin",
        password: "a0bc807b86bce3e63ad621eec41c3eb5",
        grant_type: "password",
        scope: "web",
      });
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toMatchObject({
      error_code: "LEMO.101005",
      error_message: "Invalid client: illegal device",
    });
  });

  it("API-> oauth/token: should get 400 requests, username and password is wrong", async () => {
    const response = await request(app.callback())
      .post("/oauth/token")
      .set("Authorization", "Basic MTIzNDU2OjEyMzQ1Ng==")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({
        username: "admin1",
        password: "a0bc807b86bce3e63ad621eec41c3eb5",
        grant_type: "password",
        scope: "web",
      });
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toMatchObject({
      error_code: "LEMO.101001",
      error_message: "Invalid user: username or password is incorrect, please re-enter",
    });
  });

  it("API-> oauth/token: should get 400 requests, scope is wrong", async () => {
    const response = await request(app.callback())
      .post("/oauth/token")
      .set("Authorization", "Basic MTIzNDU2OjEyMzQ1Ng==")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({
        username: "admin",
        password: "a0bc807b86bce3e63ad621eec41c3eb5",
        grant_type: "password",
        scope: "web1",
      });
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toMatchObject({
      error_code: "LEMO.101004",
      error_message: "Invalid user: invalid scope",
    });
  });

  it("API-> oauth/token: should get 400 requests, scope can not be empty", async () => {
    const response = await request(app.callback())
      .post("/oauth/token")
      .set("Authorization", "Basic MTIzNDU2OjEyMzQ1Ng==")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({
        username: "admin",
        password: "a0bc807b86bce3e63ad621eec41c3eb5",
        grant_type: "password",
      });
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toMatchObject({
      error_code: "LEMO.101003",
      error_message: "Invalid scope: scope can not be empty",
    });
  });

  it("API-> oauth/token: should get 400 requests, grant_type is error", async () => {
    const response = await request(app.callback())
      .post("/oauth/token")
      .set("Authorization", "Basic MTIzNDU2OjEyMzQ1Ng==")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({
        username: "admin",
        password: "a0bc807b86bce3e63ad621eec41c3eb5",
        grant_type: "password1",
        scope: "web",
      });
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toMatchObject({
      error_code: "LEMO.101010",
      error_message: "Unsupported grant type: `grant_type` is invalid",
    });
  });

  it("API-> oauth/secure_data: should get 200 request", async () => {
    const response = await request(app.callback())
      .post("/oauth/token")
      .set("Authorization", "Basic MTIzNDU2OjEyMzQ1Ng==")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({
        username: "admin",
        password: "a0bc807b86bce3e63ad621eec41c3eb5",
        grant_type: "password",
        scope: "web",
      });
    const accessToken = JSON.parse(response.text).access_token;

    const responseData = await request(app.callback())
      .get("/oauth/test")
      .set("Authorization", "Bearer " + accessToken)
      .set("Content-Type", "application/x-www-form-urlencoded");
    expect(responseData.status).toBe(200);
    expect(responseData.text === "test done!!");
  });

  it("API-> oauth/secure_data: should get 401 request, token invalidate", async () => {
    const responseData = await request(app.callback())
      .get("/oauth/test")
      .set("Authorization", "Bearer 7179789361a50ed3b995bb0d9c41ed09384d935f1")
      .set("Content-Type", "application/x-www-form-urlencoded");
    expect(responseData.status).toBe(401);
    expect(JSON.parse(responseData.text)).toMatchObject({
      error_code: "LEMO.101011",
      error_message: "Invalid token: access token is invalid",
    });
  });

  it("API-> oauth/secure_data: should get 401 request, token expired", async () => {
    const responseData = await request(app.callback())
      .get("/oauth/test")
      .set("Authorization", "Bearer 141d49df0326089bbd664c0317eac60179997b6b")
      .set("Content-Type", "application/x-www-form-urlencoded");
    expect(responseData.status).toBe(401);
    expect(JSON.parse(responseData.text)).toMatchObject({
      error_code: "LEMO.101008",
      error_message: "Invalid token: access token has expired",
    });
  });

  it("API-> oauth/secure_data: should get 200 request, refresh token done", async () => {
    const response1 = await request(app.callback())
      .post("/oauth/token")
      .set("Authorization", "Basic MTIzNDU2OjEyMzQ1Ng==")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({
        username: "admin",
        password: "a0bc807b86bce3e63ad621eec41c3eb5",
        grant_type: "password",
        scope: "web",
      });
    const refreshToken = JSON.parse(response1.text).refresh_token;

    const response = await request(app.callback())
      .post("/oauth/token")
      .set("Authorization", "Basic MTIzNDU2OjEyMzQ1Ng==")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      });
    expect(response.status).toBe(200);

  });

  it("API-> oauth/secure_data: should get 401 request, refresh token is invalid", async () => {
    
    const refreshToken = '5214b7bb3d5ce3a9fb7a4494d7fc85ccb1d9153a1'

    const response = await request(app.callback())
      .post("/oauth/token")
      .set("Authorization", "Basic MTIzNDU2OjEyMzQ1Ng==")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      });
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toMatchObject({
        error_code: "LEMO.101012",
        error_message: "Invalid grant: refresh token is invalid",
      });
  });


  it("API-> oauth/secure_data: should get 401 request, refresh expired", async () => {
    
    const refreshToken = 'e5b8ee1656e1d7349f4cd4e0d68a5b85c8850525'

    const response = await request(app.callback())
      .post("/oauth/token")
      .set("Authorization", "Basic MTIzNDU2OjEyMzQ1Ng==")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      });
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toMatchObject({
        error_code: "LEMO.101013",
        error_message: "Invalid grant: refresh token has expired",
      });
  });
});
