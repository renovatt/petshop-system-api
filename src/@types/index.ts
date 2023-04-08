export type ClientFormProps = {
    id: string;
    name: string;
    age: string;
    gender: string;
    userId: string;
    street: string;
    house_number: string;
    neighborhood: string;
    city: string;
    contact: string;
    created_at: Date;
};

export type DataListClientsProps = ClientFormProps[];

export type UserFormProps = {
    id: string;
    username: string;
    email: string;
    password: string;
    clients: [];
    schedules: [];
};

export type Users = {
    UserFormProps: [];
};

export type ScheduleFormProps = {
    id: string;
    tutor: string;
    pet: string;
    breed: string;
    reference_image_id: string;
    age: string;
    weight: string
    sex: string;
    date: Date;
    created_at: Date
    canceled_date: Date;
    specie: boolean;
    status: boolean;
    client: boolean;
};

export type DataListSchedulesProps = ScheduleFormProps[];

export type PetFetchProps = {
    id: string;
    name: string;
    image: {
        url: string;
    }
    reference_image_id: string;
};