'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import toast from 'react-hot-toast';
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function PropertyListPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);  
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success("Property added successfully!", { id: "success-toast" });
    }

    const fetchProperties = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error("Error fetching user:", userError.message);
        return;
      }

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('user_id', user.id); // Filter properties by the logged-in user

      if (error) {
        console.error("Error fetching properties:", error.message);
      } else {
        setProperties(data || []);
      }
      setLoading(false);
    };

    fetchProperties();
  }, [searchParams]);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-2xl">Properties List</h2>
          <Link href="/protected/property/add">
            <Button>Add Property</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(3)].map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" /> 
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" /> 
                  <Skeleton className="h-4 w-5/6" /> 
                </CardContent>
              </Card>
            ))
          ) : properties.length > 0 ? (
            properties.map((property) => (
              <Card key={property.id}>
                <CardHeader>
                  <CardTitle>{property.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{property.address}</p>
                  <p>
                    {property.description.length > 140
                      ? `${property.description.substring(0, 140)}...`
                      : property.description}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
