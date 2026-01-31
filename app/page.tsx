"use client";
import { useState } from 'react';
import { db } from './lib/firebase';
import { ref, push, set } from "firebase/database";

export default function UdharKhata() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [amount, setAmount] = useState('');

  const saveCustomer = async () => {
    if(!name || !mobile || !amount) return alert("Sabhi details bhariye!");
    try {
      const customerRef = ref(db, 'customers');
      const newRef = push(customerRef);
      await set(newRef, {
        name,
        mobile,
        balance: amount,
        date: new Date().toISOString()
      });
      alert("Customer add ho gaya!");
      setName(''); setMobile(''); setAmount('');
    } catch (err) { alert("Error: " + err.message); }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px', margin: 'auto' }}>
      <h1 style={{ color: '#2c3e50' }}>Udhar Khata App</h1>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <input placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '10px' }} />
        <input placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '10px' }} />
        <input type="number" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '10px' }} />
        <button onClick={saveCustomer} style={{ width: '100%', padding: '10px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Customer</button>
      </div>
    </div>
  );
}