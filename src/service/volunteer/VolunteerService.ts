class VolunteerService {
  static async demoBusinessLogic(): Promise<{ data?: any; errorMessage?: string }> {
    try {
      // Simulate API call and return data
      const data = {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com"
      };
      return { data };
    } catch (error) {
      return { errorMessage: `Business Logic Failed: ${error}` };
    }
  }
}
