import type { SRS } from "../types";

export const mockEntities: SRS.Entity[] = [
    {
        name: "User",
        description: "Represents a user in the system.",
        fields: [
            { id: 1, name: "userId", description: "Unique identifier for the user.", type: "integer", required: true },
            { id: 2, name: "username", description: "User's login name.", type: "string", required: true },
            { id: 3, name: "email", description: "User's email address.", type: "string", required: true },
            { id: 4, name: "firstName", description: "User's first name.", type: "string", required: false },
            { id: 5, name: "lastName", description: "User's last name.", type: "string", required: false },
        ],
    },
    {
        name: "Product",
        description: "Represents a product available for sale.",
        fields: [
            { id: 1, name: "productId", description: "Unique identifier for the product.", type: "integer", required: true },
            { id: 2, name: "productName", description: "Name of the product.", type: "string", required: true },
            { id: 3, name: "description", description: "Product description.", type: "string", required: false },
            { id: 4, name: "price", description: "Price of the product.", type: "number", required: true },
            { id: 5, name: "stock", description: "Quantity of product in stock.", type: "integer", required: true },
        ],
    },
    {
        name: "Order",
        description: "Represents a customer order.",
        fields: [
            { id: 1, name: "orderId", description: "Unique identifier for the order.", type: "integer", required: true },
            { id: 2, name: "userId", description: "Identifier of the user who placed the order.", type: "integer", required: true },
            { id: 3, name: "orderDate", description: "Date the order was placed.", type: "string", required: true },
            { id: 4, name: "totalAmount", description: "Total amount of the order.", type: "number", required: true },
            { id: 5, name: "status", description: "Status of the order.", type: "string", required: true },
        ],
    },
    {
        name: "OrderItem",
        description: "Represents an item within an order.",
        fields: [
            { id: 1, name: "orderItemId", description: "Unique identifier for the order item.", type: "integer", required: true },
            { id: 2, name: "orderId", description: "Identifier of the order.", type: "integer", required: true },
            { id: 3, name: "productId", description: "Identifier of the product.", type: "integer", required: true },
            { id: 4, name: "quantity", description: "Quantity of the product in the order.", type: "integer", required: true },
            { id: 5, name: "itemPrice", description: "Price of the item.", type: "number", required: true },
        ],
    },
    {
        name: "Customer",
        description: "Represents a customer.",
        fields: [
            { id: 1, name: "customerId", description: "Unique identifier for the customer.", type: "integer", required: true },
            { id: 2, name: "customerName", description: "Name of the customer.", type: "string", required: true },
            { id: 3, name: "address", description: "Customer's address.", type: "string", required: false },
            { id: 4, name: "phoneNumber", description: "Customer's phone number.", type: "string", required: false },
            { id: 5, name: "email", description: "Customer's email.", type: "string", required: false },
        ],
    },
    {
        name: "Category",
        description: "Represents a product category.",
        fields: [
            { id: 1, name: "categoryId", description: "Unique identifier for the category.", type: "integer", required: true },
            { id: 2, name: "categoryName", description: "Name of the category.", type: "string", required: true },
            { id: 3, name: "description", description: "Category description.", type: "string", required: false },
        ],
    },
    {
        name: "Review",
        description: "Represents a product review.",
        fields: [
            { id: 1, name: "reviewId", description: "Unique identifier for the review.", type: "integer", required: true },
            { id: 2, name: "productId", description: "Identifier of the reviewed product.", type: "integer", required: true },
            { id: 3, name: "userId", description: "Identifier of the user who wrote the review.", type: "integer", required: true },
            { id: 4, name: "rating", description: "Rating given by the user.", type: "number", required: true },
            { id: 5, name: "comment", description: "User's comment.", type: "string", required: false },
        ],
    },
    {
        name: "Payment",
        description: "Represents a payment transaction.",
        fields: [
            { id: 1, name: "paymentId", description: "Unique identifier for the payment.", type: "integer", required: true },
            { id: 2, name: "orderId", description: "Identifier of the order associated with the payment.", type: "integer", required: true },
            { id: 3, name: "paymentDate", description: "Date of the payment.", type: "string", required: true },
            { id: 4, name: "amount", description: "Amount paid.", type: "number", required: true },
            { id: 5, name: "paymentMethod", description: "Method of payment.", type: "string", required: true },
        ],
    },
    {
        name: "Shipping",
        description: "Represents shipping details for an order.",
        fields: [
            { id: 1, name: "shippingId", description: "Unique identifier for the shipping.", type: "integer", required: true },
            { id: 2, name: "orderId", description: "Identifier of the order associated with the shipping.", type: "integer", required: true },
            { id: 3, name: "shippingAddress", description: "Shipping address.", type: "string", required: true },
            { id: 4, name: "shippingDate", description: "Date of shipping.", type: "string", required: false },
            { id: 5, name: "trackingNumber", description: "Tracking number of the shipment.", type: "string", required: false },
        ],
    },
    {
        name: "Coupon",
        description: "Represents a discount coupon.",
        fields: [
            { id: 1, name: "couponId", description: "Unique identifier for the coupon.", type: "integer", required: true },
            { id: 2, name: "couponCode", description: "Code of the coupon.", type: "string", required: true },
            { id: 3, name: "discountAmount", description: "Amount of the discount.", type: "number", required: true },
            { id: 4, name: "expiryDate", description: "Expiry date of the coupon.", type: "string", required: false },
            { id: 5, name: "isActive", description: "Whether the coupon is active.", type: "boolean", required: true },
        ],
    },
];

export function getRandomEntity() {
    const len = mockEntities.length
    const idx = (Math.floor(Math.random()) * len)
    console.debug(idx)
    return [mockEntities[idx]]
}