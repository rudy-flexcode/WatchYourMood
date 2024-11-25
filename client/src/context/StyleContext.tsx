import { useState, useEffect, createContext, useContext } from "react";

// Définir le type des styles
interface StyleContextType {
  backgroundColor: string; // couleur actuelle
  getColors: (newColor: string) => void; // fonction pour changer la couleur
}

interface ChildrenType {
  children: React.ReactNode;
}

// Initialise le context
const StyleContext = createContext<StyleContextType | null>(null);

export function StyleProvider({ children }: ChildrenType) {
  const [backgroundColor, setBackgroundColor] = useState<string>("#FFDF38");

  /**
   * Une fonction qui va récuperer la couleur de l'émotion
   */
  const getColors = (emotion: string) => {
    let colorEmotion = "#FFDF38";
    switch (emotion) {
      case "peur":
        colorEmotion = "#8D56AD";

        break;
      case "tristesse":
        colorEmotion = "#77B9F6";
        break;

      case "colere":
        colorEmotion = "#EB2027";

        break;
      default:
        colorEmotion = "#FFDF38";
        break;
    }

    setBackgroundColor(colorEmotion);
    localStorage.setItem("backgroundColor", colorEmotion);
  };

  useEffect(() => {
    // Vérifier si une couleur est déjà sauvegardée dans localStorage
    const storedColor = localStorage.getItem("backgroundColor");

    if (storedColor) {
      setBackgroundColor(storedColor); // Si une couleur est sauvegardée, on l'applique
    }
  }, []);

  return (
    <StyleContext.Provider value={{ backgroundColor, getColors }}>
      {children} {/* Les composants enfants auront accès au contexte */}
    </StyleContext.Provider>
  );
}

// Hook personnalisé pour accéder à la couleur de fond et la fonction qui la modifie
export const useStyleContext = (): StyleContextType => {
  const context = useContext(StyleContext); // Accéder au contexte

  if (!context) {
    throw new Error("useStyleContext must be used within a StyleProvider");
  }

  return context; // Retourner le contexte (couleur de fond et fonction pour la changer)
};
