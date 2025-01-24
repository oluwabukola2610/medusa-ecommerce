import Medusa from "@medusajs/medusa-js"

const medusaClient = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_SERVER_URL,
  maxRetries: 3,
  publishableApiKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY,
  cache: "no-store", 
})

export { medusaClient }




// Login function
export const loginWithMedusa = async (email, password) => {
  try {
    const response = await medusaClient.auth.authenticate({
      email,
      password
    });
        if (response.customer) {
      localStorage.setItem('medusa_customer', JSON.stringify(response.customer));
      return { success: true, customer: response.customer };
    }
    
    return { success: false };
  } catch (error) {
    console.error('Login failed:', error);
    return { success: false, error };
  }
};

// Logout function
export const logoutFromMedusa = async () => {
  try {
    await medusaClient.auth.deleteSession();
    localStorage.removeItem('medusa_customer');
    return { success: true };
  } catch (error) {
    console.error('Logout failed:', error);
    return { success: false };
  }
};
export const isAuthenticated = () => {
  return !!localStorage.getItem('medusa_customer');
};