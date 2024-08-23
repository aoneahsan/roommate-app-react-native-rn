export const placeAutoCompleteApi = ({ apiKey }: {
    apiKey: string
}) => {
    return `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&libraries=places&callback=initMap`
}