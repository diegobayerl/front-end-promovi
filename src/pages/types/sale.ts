interface Sale {
    id: string;
    amount: string;
    company: {
        id: string;
        name: string;
    },
    product: {
        id: string;
        category: string;
        description: string;
    },
    user: {
        id: string;
        name: string;
        email: string;
    }

}

export default Sale;