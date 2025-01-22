import { create } from 'zustand';
import Toast from 'react-native-toast-message';
import { FoodDetail } from '../app/food-detail';


interface CartItem extends FoodDetail {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  itemCount: number;
  addItem: (item: FoodDetail) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  itemCount: 0,
  addItem: (item) => 
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      
      if (existingItem) {
        Toast.show({
          type: 'success',
          text1: 'Cantidad actualizada',
          text2: `Se agregó otro ${item.name} al carrito`,
          visibilityTime: 2000,
          position: 'top',
          topOffset: 60,
        });
        
        return {
          items: state.items.map((i) =>
            i.id === item.id 
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          itemCount: state.itemCount + 1,
        };
      }

      Toast.show({
        type: 'success',
        text1: '¡Producto añadido!',
        text2: `${item.name} se ha añadido al carrito`,
        visibilityTime: 2000,
        position: 'top',
        topOffset: 60,
      });

      return {
        items: [...state.items, { ...item, quantity: 1 }],
        itemCount: state.itemCount + 1,
      };
    }),
  removeItem: (id) =>
    set((state) => {
      const item = state.items.find(item => item.id === id);
      if (item) {
        Toast.show({
          type: 'success',
          text1: 'Producto eliminado',
          text2: `${item.name} se ha eliminado del carrito`,
          visibilityTime: 2000,
          position: 'top',
          topOffset: 60,
        });
      }
      
      return {
        items: state.items.filter((item) => item.id !== id),
        itemCount: state.itemCount - (item?.quantity || 0),
      };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      const item = state.items.find(item => item.id === id);
      if (!item) return state;

      if (quantity < 1) {
        Toast.show({
          type: 'success',
          text1: 'Producto eliminado',
          text2: `${item.name} se ha eliminado del carrito`,
          visibilityTime: 2000,
          position: 'top',
          topOffset: 60,
        });

        return {
          items: state.items.filter((item) => item.id !== id),
          itemCount: state.itemCount - item.quantity,
        };
      }

      const oldQuantity = item.quantity;
      const newState = {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
        itemCount: state.itemCount + (quantity - oldQuantity),
      };

      Toast.show({
        type: 'success',
        text1: 'Cantidad actualizada',
        text2: `${item.name}: ${quantity} unidades`,
        visibilityTime: 2000,
        position: 'top',
        topOffset: 60,
      });

      return newState;
    }),
}));
