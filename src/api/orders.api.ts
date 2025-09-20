export async function getUserOrders(userId: string) {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("getUserOrders response:", JSON.stringify(data, null, 2)); // Debugging
    return data || [];
  } catch (error) {
    console.error("Error in getUserOrders:", error);
    throw error;
  }
}