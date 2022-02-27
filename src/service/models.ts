import { type } from "os";

export interface Name {
    fn: string;
    fnt: string;
    gn: string;
    gnt: string;
}

export interface VaccineSimple {
    tg: string;
    vp: string;
    mp: string;
    ma: string;
    dn: number;
    sd: number;
    dt: string;
    co: string;
    is: string;
    ci: string;
}


export interface TestNaat {
    tg: string;
    tt: string;
    nm: string;
    sc: Date;
    tr: string;
    tc: string;
    co: string;
    is: string;
    ci: string;
}

export interface TestRat {
    tg: string;
    tt: string;
    ma: string;
    sc: Date;
    tr: string;
    tc: string;
    co: string;
    is: string;
    ci: string;
}

export interface RecoverySimple {
    tg: string;
    fr: string;
    co: string;
    is: string;
    df: string;
    du: string;
    ci: string;
}


export type Test = TestNaat | TestRat;

export type Vaccine = VaccineSimple;

export type Recovery = RecoverySimple;

export interface DCCData {
    ver: string;
    nam: Name;
    dob: string;
    v: Vaccine[];
    t: Test[];
    r: Recovery[];
}



export interface DecodeResponse {
    data: DCCData;
    result: boolean;
}