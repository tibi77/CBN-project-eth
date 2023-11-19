// Environment variable validation
export declare global {
    namespace NodeJS {
      export interface ProcessEnv {
        NODE_ENV: "development" | "production";
        NEXTAUTH_SECRET: string;
        AUTH_GOOGLE_ID: string;
        AUTH_GOOGLE_SECRET: string;
      }
    }
  }
  