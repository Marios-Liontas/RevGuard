

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
            credentials:"include"
        });
    
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
};


export const loginUser = async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials:"include"
        });
    
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
};


export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/validate-token`, {
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Token invalid");
    }

    return response.json();
};


export const SignOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/logout`, {
        credentials: "include",
        method: "POST"
    });

    if (!response.ok) {
        throw new Error("Error during sign out");
    }
};


export const CreateRevenue = async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/new-revenue`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message || "Failed to create revenue");
    }

    return responseBody;
};


export const GetRevenues = async () => {
    const response = await fetch(`${API_BASE_URL}/api/get-revenues`, {
        credentials: "include",
        method: "GET"
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message || "Error while fetching Revenues")
    }

    return responseBody;
};


export const GetRevenueById = async (id) => {

    if (!id) {
        throw new Error("Revenue ID is required");
    }
    const response = await fetch(`${API_BASE_URL}/api//get-revenue/${id}`, {
        credentials: "include"
    });
    
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message || "Error while fetching Revenues")
    }

    return responseBody;
};


export const UpdateRevenue = async (id, data) => {
    if (!id) {
        throw new Error("Revenue ID is required");
    }

    const response = await fetch(`${API_BASE_URL}/api/edit-revenue/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message || "Error while updating current revenue")
    }

    return responseBody;
};


export const DeleteRevenue = async (id) => {
    if (!id) {
        throw new Error("Revenue ID is required")
    }

    const response = await fetch(`${API_BASE_URL}/api/delete-revenue/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.message || "Error while deleting current revenue")
    }
};


export const CreateExpense = async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/new-expense`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message || "Failed to create expense");
    }

    return responseBody;
};


export const GetExpenses = async () => {
    const response = await fetch(`${API_BASE_URL}/api/get-expenses`, {
        credentials: "include",
        method: "GET"
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message || "Error while fetching Expenses")
    }

    return responseBody;
};


export const GetExpenseById = async (id) => {

    if (!id) {
        throw new Error("Expense ID is required");
    }
    const response = await fetch(`${API_BASE_URL}/api//get-expense/${id}`, {
        credentials: "include"
    });
    
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message || "Error while fetching Expenses")
    }

    return responseBody;
};


export const UpdateExpense = async (id, data) => {
    if (!id) {
        throw new Error("Expense ID is required");
    }

    const response = await fetch(`${API_BASE_URL}/api/edit-expense/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message || "Error while updating current expense")
    }

    return responseBody;
};


export const DeleteExpense = async (id) => {
    if (!id) {
        throw new Error("Expense ID is required")
    }

    const response = await fetch(`${API_BASE_URL}/api/delete-expense/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.message || "Error while deleting current expense")
    }
};