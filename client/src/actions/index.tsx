// action types
export const SIGN_IN = "SIGN_IN" as const;
export const SIGN_OUT = "SIGN_OUT" as const;

export type Action =
  | ReturnType<typeof signIn>
  | ReturnType<typeof signOut>;

// actions creator functions
export const signIn = (token: string, email: string, username: "") => {
    return {
        type: SIGN_IN,
        payload: {
        token,
        email,
        username,
        },
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};



// reducer를 고려하여 action 작성 필요