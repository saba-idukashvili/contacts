import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MailIcon,
  PhoneIcon,
  Instagram,
  Facebook,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ContactCard = ({ contact, onEdit, onDelete }: any) => {
  const getInitials = (name: any) => {
    return name
      .split(' ')
      .map((word: any) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarColors = [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
  ];
  const avatarColor = avatarColors[contact.name.length % avatarColors.length];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-xl`}>
                {getInitials(contact.name)}
              </div>
              <h3 className="font-semibold text-xl">{contact.name}</h3>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onEdit(contact)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(contact.id)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <PhoneIcon className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>{contact.phone}</span>
            </div>
            {contact.email && (
              <div className="flex items-center text-sm">
                <MailIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>{contact.email}</span>
              </div>
            )}
            {contact.instagram && (
              <div className="flex items-center text-sm">
                <Instagram className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>{contact.instagram}</span>
              </div>
            )}
            {contact.facebook && (
              <div className="flex items-center text-sm">
                <Facebook className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>{contact.facebook}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
