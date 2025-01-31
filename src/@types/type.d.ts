type UserData = {
    name: string;
    phone: string;
    email: string;
    password: string;
};

type NewPassword = {
    user: UserData;
    newPassword: string;
};
