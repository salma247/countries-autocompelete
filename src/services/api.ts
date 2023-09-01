export const fetchCountries: () => Promise<string[]> = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        return data.map((country: any) => country.name.common);
    }
    catch (error) {
        console.log(error);
    }
}