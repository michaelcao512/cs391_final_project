"use client";
import React, { useState, useEffect } from "react";
import { getAllUsers } from "@/lib/database";
import {PersonalityType, User as UserType} from "@prisma/client";
import styled from 'styled-components';

const UserCard = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 8px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.p`
  margin: 4px 0;
    color: white;
`;
function SearchProfile() {
    const [users, setUsers] = useState<(UserType & { personalityType: PersonalityType })[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const usersData = await getAllUsers();
                setUsers(usersData);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch users", error);
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);


    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <UserCard key={user.id}>
                            <UserInfo>Name: {user.name}</UserInfo>
                            <UserInfo>Email: {user.email}</UserInfo>
                            <UserInfo>Biography: {user.biography}</UserInfo>
                            <UserInfo>Personality Type: {user.personalityType?.name || 'Unknown'}</UserInfo>

                        </UserCard>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchProfile;