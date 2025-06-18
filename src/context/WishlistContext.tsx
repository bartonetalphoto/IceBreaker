import React, { createContext, useContext, useState, ReactNode } from 'react';

type Wishlist = {
  [folderName: string]: string[]; // influencerId[]
};

type WishlistContextType = {
  wishlist: Wishlist;
  toggleWishlist: (influencerId: string) => void;
  isWished: (influencerId: string) => boolean;
  addToFolder: (influencerId: string, folderName: string) => void;
  createFolder: (folderName: string) => void;
  deleteFolder: (folderName: string) => void;           // NEW
  renameFolder: (oldName: string, newName: string) => void; // NEW
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Wishlist>({
    All: [],
  });

  const toggleWishlist = (influencerId: string) => {
    setWishlist((prev) => {
      const newWishlist = { ...prev };
      const isAlreadyInAll = newWishlist.All.includes(influencerId);
      newWishlist.All = isAlreadyInAll
        ? newWishlist.All.filter((id) => id !== influencerId)
        : [...newWishlist.All, influencerId];
      return newWishlist;
    });
  };

  const isWished = (influencerId: string) => {
    return wishlist.All.includes(influencerId);
  };

  const addToFolder = (influencerId: string, folderName: string) => {
    setWishlist((prev) => {
      const newWishlist = { ...prev };
      if (!newWishlist[folderName]) newWishlist[folderName] = [];
      if (!newWishlist[folderName].includes(influencerId)) {
        newWishlist[folderName].push(influencerId);
      }
      if (!newWishlist.All.includes(influencerId)) {
        newWishlist.All.push(influencerId);
      }
      return newWishlist;
    });
  };

  const createFolder = (folderName: string) => {
    setWishlist((prev) => {
      if (prev[folderName]) return prev;
      return { ...prev, [folderName]: [] };
    });
  };

    const deleteFolder = (folderName: string) => {
    setWishlist((prev) => {
      if (folderName === 'All') return prev; // never delete “All”
      const { [folderName]: removed, ...rest } = prev;
      return rest;
    });
  };

  const renameFolder = (oldName: string, newName: string) => {
    setWishlist((prev) => {
      if (!prev[oldName] || prev[newName]) return prev; // no rename if oldName missing or newName exists
      const updated: Wishlist = {};
      Object.entries(prev).forEach(([key, ids]) => {
        if (key === oldName) {
          updated[newName] = ids;
        } else {
          updated[key] = ids;
        }
      });
      return updated;
    });
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isWished, addToFolder, createFolder, deleteFolder,renameFolder }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
