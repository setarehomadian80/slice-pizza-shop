import type { DealField } from "@/types/deal";

const pizzaOptions = [
  "Margherita (veggie)",
  "Marinara (vegan)",
  "Pepperoni Party",
  "Hot Honey Pep",
  "The Big Nduja",
  "Sausage & Friarielli",
  "Funghi Bianca (veggie)",
  "Green Machine (vegan)",
  "The Controversial One",
  "Quattro Formaggi (veggie)",
  "Veg Out (veggie)",
  "Vegan Diavola (vegan)",
] as const;

const drinkOptions = [
  "Cola (vegan)",
  "Sicilian Lemonade (vegan)",
  "Blood Orange Soda (vegan)",
  "Still Water (vegan)",
  "Club Pale Ale (vegan)",
] as const;

const dipOptions = [
  "Garlic Mayo (veggie)",
  "Vegan Garlic Dip (vegan)",
  "Hot Honey (veggie)",
  "Nduja Mayo",
  "Buttermilk Ranch (veggie)",
] as const;

const sideOptions = [
  "Garlic Knots (veggie)",
  "Cheesy Garlic Bread (veggie)",
  "Hot Honey Wings",
  "Burrata & Tomatoes (veggie)",
  "Rosemary Potatoes (vegan)",
  "Big Green Salad (vegan)",
] as const;

const dessertOptions = [
  "Nutella Knots (veggie)",
  "Tiramisu Pot (veggie)",
  "Salted Choc Cookie (vegan)",
  "Pistachio Gelato (veggie)",
] as const;

export const dealFields: Record<string, readonly DealField[]> = {
  "solo-lunch": [
    {
      kind: "select",
      id: "pizza-one",
      label: "Your pizza (Small 10″)",
      options: pizzaOptions,
      defaultValue: "Margherita (veggie)",
    },
    {
      kind: "select",
      id: "drink",
      label: "Your drink",
      options: drinkOptions,
      defaultValue: "Sicilian Lemonade (vegan)",
    },
  ],

  "date-night-duo": [
    {
      kind: "select",
      id: "pizza-one",
      label: "Pizza one (Regular 12″)",
      options: pizzaOptions,
      defaultValue: "Margherita (veggie)",
    },
    {
      kind: "select",
      id: "pizza-two",
      label: "Pizza two (Regular 12″)",
      options: pizzaOptions,
      defaultValue: "Marinara (vegan)",
    },
    {
      kind: "included",
      id: "garlic-knots",
      label: "Garlic Knots",
    },
    {
      kind: "select",
      id: "dip-one",
      label: "Dip one",
      options: dipOptions,
      defaultValue: "Hot Honey (veggie)",
    },
    {
      kind: "select",
      id: "dip-two",
      label: "Dip two",
      options: dipOptions,
      defaultValue: "Nduja Mayo",
    },
  ],

  "family-feast": [
    {
      kind: "select",
      id: "pizza-one",
      label: "Large pizza one (Large 16″)",
      options: pizzaOptions,
      defaultValue: "Margherita (veggie)",
    },
    {
      kind: "select",
      id: "pizza-two",
      label: "Large pizza two (Large 16″)",
      options: pizzaOptions,
      defaultValue: "Marinara (vegan)",
    },
    {
      kind: "select",
      id: "side-one",
      label: "Side one",
      options: sideOptions,
      defaultValue: "Hot Honey Wings",
    },
    {
      kind: "select",
      id: "side-two",
      label: "Side two",
      options: sideOptions,
      defaultValue: "Burrata & Tomatoes (veggie)",
    },
    {
      kind: "select",
      id: "dip-one",
      label: "Dip one",
      options: dipOptions,
      defaultValue: "Buttermilk Ranch (veggie)",
    },
    {
      kind: "select",
      id: "dip-two",
      label: "Dip two",
      options: dipOptions,
      defaultValue: "Garlic Mayo (veggie)",
    },
    {
      kind: "select",
      id: "dip-three",
      label: "Dip three",
      options: dipOptions,
      defaultValue: "Vegan Garlic Dip (vegan)",
    },
    {
      kind: "select",
      id: "dip-four",
      label: "Dip four",
      options: dipOptions,
      defaultValue: "Hot Honey (veggie)",
    },
    {
      kind: "select",
      id: "dessert",
      label: "Dessert",
      options: dessertOptions,
      defaultValue: "Nutella Knots (veggie)",
    },
  ],
};