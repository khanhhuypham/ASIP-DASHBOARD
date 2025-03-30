import { COOKIE_KEYS } from "../constants/cookie-key";

export default class CookieUtils {
  static getCookie<T = string>(name: string): T | null {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const trimmedCookie = cookie.trim();
      if (trimmedCookie.startsWith(nameEQ)) {
        const cookieValue = trimmedCookie.substring(nameEQ.length);
        try {
          return JSON.parse(cookieValue) as T;
        } catch (error) {
          console.error("Error parsing cookie:", error);
          return null;
        }
      }
    }
    return null;
  }
  static eraseCookie(name: string): void {
    // document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=Strict; Secure; HttpOnly`;
    document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
  }

  static setCookie(
    name: string,
    value: string,
    hours: number = 12
    // secure: boolean = false,
    // httpOnly: boolean = true,
    // sameSite: "Strict" | "Lax" | "None" = "Strict"
    /*
            Strict: Cookie không bao giờ được gửi với các yêu cầu từ trang khác.
            Lax: Cookie được gửi với các yêu cầu điều hướng trên cùng một site (mức bảo mật thấp hơn Strict).
            None: Cookie có thể được gửi với các yêu cầu từ các trang khác (cần kết hợp với Secure).
        */
  ): void {
    const expires = `max-age=${hours * 60 * 60}`; // if days: (days * 24 * 60 * 60)
    let cookie = `${name}=${value}; ${expires}; path=/`;
    // Thêm thuộc tính bảo mật
    // if (secure) { cookie += "; Secure"; } // Chỉ cho phép cookie được gửi qua kết nối HTTPS.
    // if (httpOnly) { cookie += "; HttpOnly"; } //Ngăn chặn JavaScript truy cập vào cookie, bảo vệ chống tấn công XSS.
    // cookie += `; SameSite=${sameSite}`; // Ngăn chặn cookie được gửi trong các yêu cầu từ các trang khác (bảo vệ chống lại CSRF).
    document.cookie = cookie;
  }

  static getCurrentUser(): any {
    const user = this.getCookie<any>(COOKIE_KEYS.USER);
    return user ?? {};
  }
}
