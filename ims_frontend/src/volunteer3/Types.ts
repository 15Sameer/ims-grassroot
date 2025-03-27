// src/types/types.ts
export interface Package {
    id: string;
    status: 'ready' | 'in-progress' | 'completed';
    items: string;
    packer: string;
    customer: {
      name: string;
      phone: string;
    };
    address: string;
    progress: {
      packed: boolean;
      collecting: boolean;
      assigned: boolean;
    };
  }
  
  export interface Collection {
    id: string;
    items: string;
    customer: string;
    collectionTime: string;
    status: 'completed' | 'pending';
  }
  
  export interface StatsCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    color?: string; // Added cardColor property
  }