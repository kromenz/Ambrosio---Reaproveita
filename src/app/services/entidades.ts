export interface Item {
    id_item?: number;
    nome: string;
}

export interface Linha_Lista {
    id_item?: number;
    id_user?: number;
    quantidade: number;
}

export interface Lista {
    id_lista?: number;
    id_user?: number;
    nome: string;
}

export interface User {
    id_user?: number;
    nome: string;
    apelido: string;
    email: string;
    username: string;
    password: string;
}