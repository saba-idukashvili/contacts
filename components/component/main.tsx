"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MailIcon,
  PhoneIcon,
  PlusIcon,
  SearchIcon,
  Instagram,
  UserCircle2,
  Pencil,
  Trash2,
  Facebook,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ContactCard from "./contactCard";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
}

export function Main() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newContact, setNewContact] = useState<Contact>({
    id: "",
    name: "",
    phone: "",
    email: "",
    instagram: "",
    facebook: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedContacts = localStorage.getItem("contacts");
      setContacts(storedContacts ? JSON.parse(storedContacts) : []);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleAddOrUpdateContact = () => {
    if (newContact.name && newContact.phone) {
      if (editingContact) {
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === editingContact.id
              ? { ...contact, ...newContact }
              : contact
          )
        );
        setEditingContact(null);
      } else {
        setContacts((prevContacts) => [
          ...prevContacts,
          { ...newContact, id: Date.now().toString() },
        ]);
      }
      setNewContact({
        id: "",
        name: "",
        phone: "",
        email: "",
        instagram: "",
        facebook: "",
      });
      setIsDialogOpen(false);
    }
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setNewContact(contact);
    setIsDialogOpen(true);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.instagram.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.facebook.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-background px-4 py-3 border-b">
        <div className="relative flex items-center gap-1">
          <SearchIcon className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search contacts..."
            className="w-full rounded-lg bg-background pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
            />
          ))}
        </div>
      </div>
      <div className="bg-background px-4 py-3 border-t">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full flex items-center gap-1">
              <PlusIcon className="w-4 h-4" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="mt-6 space-y-4">
              <Input
                type="text"
                placeholder="Name"
                value={newContact.name}
                onChange={(e) =>
                  setNewContact({ ...newContact, name: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Phone number"
                value={newContact.phone}
                onChange={(e) =>
                  setNewContact({ ...newContact, phone: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="Email"
                value={newContact.email}
                onChange={(e) =>
                  setNewContact({ ...newContact, email: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Instagram"
                value={newContact.instagram}
                onChange={(e) =>
                  setNewContact({ ...newContact, instagram: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Facebook"
                value={newContact.facebook}
                onChange={(e) =>
                  setNewContact({ ...newContact, facebook: e.target.value })
                }
              />
              <div className="flex items-center gap-2">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingContact(null);
                    setNewContact({
                      id: "",
                      name: "",
                      phone: "",
                      email: "",
                      instagram: "",
                      facebook: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button className="w-full" onClick={handleAddOrUpdateContact}>
                  {editingContact ? "Update" : "Save"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
