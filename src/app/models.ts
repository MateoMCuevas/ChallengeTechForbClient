export interface LoginRequest {
    email: string;
    password: string;
}
export interface SignupRequest {
    firstName:string;
    lastName: string;
    email: string;
    password: string;
}

export interface User{
    name: string;
    lastName: string;
}

export interface Reading{
    name: string;
    count: number;
}

export interface Characteristic{
    name: string;
    okCount:number;
    mediumAlertCount:number;
    redAlertCount:number;
}

export interface Country{
    name: string;
    flagUrl: string;
}

export interface Plant{
    id:number;
    name: string;
    country: Country;
    okCount:number;
    mediumAlertCount:number;
    redAlertCount:number;
}

export interface CreatePlantRequest{
    name: string;
    country: string;
}

export interface UpdatePlantRequest{
    id:number;
    name:string,
    country:string,
    okCount:number;
    mediumAlertCount:number;
    redAlertCount:number;
}