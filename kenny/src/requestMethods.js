import axios from "axios";

const BASE_URL = "http://localhost:8989/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDdmZTI5MDUyOTQyMTI2MWRlMTkyNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MTQ2ODI3MCwiZXhwIjoxNjYxNzI3NDcwfQ.OZyo1xZiAilo9yC-bnM4L36CTkdfDAEJafq-6chrpY0"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`}
})