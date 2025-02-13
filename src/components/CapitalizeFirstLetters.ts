export const  capitalizeFirstLetters = (str:any)=> {
  // Split the string into an array of words
  const words = str?.split(' ');

  // Capitalize the first letter of each word
  const capitalizedWords = words?.map(function(word:any) {
    return word?.charAt(0).toUpperCase() + word?.slice(1);
  });

  // Join the capitalized words back into a string
  const capitalizedString = capitalizedWords?.join(' ');

  return capitalizedString;
}