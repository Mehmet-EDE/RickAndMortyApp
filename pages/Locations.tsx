"use client"
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { client } from '@/lib/apollo';


const GET_LOCATIONS = gql`
{
    locations {
    results {
      id
      name
      type
      created
    }
  }
}`

export default function Locations() {
    const { loading, error, data } = useQuery(GET_LOCATIONS, { client });
    console.log(data)
  return (
    <div>Locations</div>
  )
}
