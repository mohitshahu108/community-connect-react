class VolunteerApis {
  public static async demoApiCall(): Promise<{ data?: any; errorMessage?: string }> {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      const data = await response.json();
      return { data };
    } catch (error) {
      return { errorMessage: `API Call Failed: ${error}` };
    }
  }
}
