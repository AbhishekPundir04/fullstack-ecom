import { createUserTable } from "../models/userTable.js";
import { createShippingInfoTable } from "../models/shippingInfoTable.js";
import { createProductsTable } from "../models/productTable.js";
import { createProductReviewsTable } from "../models/productReviewsTable.js";
import { createPaymentsTable } from "../models/paymentsTable.js";
import { createOrdersTable } from "../models/ordersTable.js";
import { createOrderItemTable } from "../models/orderItemsTable.js";

export const createTable = async (database, tableName, query) => {
    try {
        await createUserTable();
        await createProductsTable();
        await createProductReviewsTable();
        await createOrdersTable();
        await createOrderItemTable();
        await createShippingInfoTable();
        await createPaymentsTable();
        console.log(`table created successfully.`);
    }
    catch (error) {
        console.error(`Error creating ${tableName} table:`, error);
        process.exit(1);

    }
}