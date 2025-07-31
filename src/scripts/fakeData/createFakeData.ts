import { de_CH, de_AT, de, Faker } from '@faker-js/faker';
import fs from 'fs';
import { createBooking } from './createBookingData';
import { createProperty } from './createPropertyData';
import {createMaintenance} from "./createMaintenanceData";

const faker = new Faker({
    locale: [de_CH, de_AT, de],
});

faker.seed(743821);
/*
const bookings = faker.helpers.multiple(createBooking, {
    count: 10,
});
fs.writeFileSync('bookings.json', JSON.stringify(bookings, null, 2));

const properties = faker.helpers.multiple(createProperty, {
    count: 10,
});
fs.writeFileSync('properties.json', JSON.stringify(properties, null, 2));
*/
const maintenance = faker.helpers.multiple(createMaintenance, {
    count: 20,
});
fs.writeFileSync('maintenance.json', JSON.stringify(maintenance, null, 2));