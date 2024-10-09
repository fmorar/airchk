'use client';

import { useEffect, useState } from "react";
import { addPropertyAction } from "@/app/[locale]/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; 
import { createClient } from "@/utils/supabase/client";

export default function AddProperty({ searchParams }: { searchParams: Message }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    type_id: '',
    num_bedrooms: '',
    num_bathrooms: '',
    guest_capacity: '',
    policies: '',
    cleaning_fee: '',
    checkin_time: '',
    checkout_time: '',
    user_id: '', // Placeholder for user ID
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user id asynchronously and update formData with it
    const fetchUserId = async () => {
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();

      if (user && !error) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          user_id: user.id, // Save the user's ID in formData
        }));
      } else {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserId();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch listing data from Airbnb API
  const handleFetchListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = (document.querySelector("input[name='airbnb_url']") as HTMLInputElement).value;

    try {
      const response = await fetch(`/api/scrapeAirbnb?url=${encodeURIComponent(url)}`);

      const scrapedData = await response.json();

      if (scrapedData) {
        setFormData({
          name: scrapedData.name,
          address: scrapedData.address,
          description: scrapedData.description,
          type_id: '', 
          num_bedrooms: scrapedData.numBedrooms,
          num_bathrooms: scrapedData.numBathrooms,
          guest_capacity: scrapedData.guestCapacity,
          policies: '',
          cleaning_fee: '',
          checkin_time: '',
          checkout_time: '',
          user_id: formData.user_id, // Preserve user_id
        });
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
    }

    setLoading(false);
  };

  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto" onSubmit={handleFetchListing}>
        <h1 className="text-2xl font-medium">Add New Property</h1>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="airbnb_url">Airbnb URL</Label>
          <Input name="airbnb_url" placeholder="Enter Airbnb URL" required />
          <Button type="submit" className="mt-4" disabled={loading}>
            {loading ? 'Fetching...' : 'Fetch Listing'}
          </Button>
        </div>
      </form>

      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h2 className="text-xl font-medium mt-8">Property Details</h2>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="name">Property Name</Label>
          <Input name="name" value={formData.name || ""} onChange={handleChange} placeholder="Property Name" required />

          <Label htmlFor="address">Address</Label>
          <Input name="address" value={formData.address || ""} onChange={handleChange} placeholder="123 Main St" required />

          <Label htmlFor="description">Description</Label>
          <Input name="description" value={formData.description || ""} onChange={handleChange} placeholder="Property Description" required />

          <Label htmlFor="type_id">Property Type ID</Label>
          <Input type="number" name="type_id" value={formData.type_id || ""} onChange={handleChange} placeholder="Type ID" required />

          <Label htmlFor="num_bedrooms">Number of Bedrooms</Label>
          <Input type="number" name="num_bedrooms" value={formData.num_bedrooms || ""} onChange={handleChange} placeholder="2" required />

          <Label htmlFor="num_bathrooms">Number of Bathrooms</Label>
          <Input type="number" name="num_bathrooms" value={formData.num_bathrooms || ""} onChange={handleChange} placeholder="2" required />

          <Label htmlFor="guest_capacity">Guest Capacity</Label>
          <Input type="number" name="guest_capacity" value={formData.guest_capacity || ""} onChange={handleChange} placeholder="4" required />

          <Label htmlFor="policies">Policies</Label>
          <Input name="policies" value={formData.policies || ""} onChange={handleChange} placeholder="Property Policies" />

          <Label htmlFor="cleaning_fee">Cleaning Fee</Label>
          <Input type="number" step="0.01" name="cleaning_fee" value={formData.cleaning_fee || ""} onChange={handleChange} placeholder="Cleaning Fee" />

          <Label htmlFor="checkin_time">Check-in Time</Label>
          <Input type="time" name="checkin_time" value={formData.checkin_time || ""} onChange={handleChange} required />

          <Label htmlFor="checkout_time">Check-out Time</Label>
          <Input type="time" name="checkout_time" value={formData.checkout_time || ""} onChange={handleChange} required />

          <SubmitButton formAction={addPropertyAction} pendingText="Adding property...">
            Add Property
          </SubmitButton>
        </div>
      </form>
    </>
  );
}
