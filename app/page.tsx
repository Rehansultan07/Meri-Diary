"use client";
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { ref, push, set, onValue } from "firebase/database";

export default function MeriDiary() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const custRef = ref(db, 'customers');
    onValue(custRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setCustomers(list.reverse());
      }
    });
  }, []);

  const addEntry = async () => {
    if(!name || !amount) return alert("Poori details bhariye!");
    const newRef = push(ref(db, 'customers'));
    await set(newRef, { name, balance: amount, date: new Date().toLocaleDateString() });
    setName(''); setAmount('');
  };

  return (
    <div style={{ background: '#f0f2f5', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#1a73e8', color: 'white', padding: '20px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>📓 Meri Diary</h1>
      </div>
      <div style={{ maxWidth: '500px', margin: '20px auto', padding: '0 15px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <input placeholder="Customer Name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
          <input type="number" placeholder="Amount (₹)" value={amount} onChange={e => setAmount(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
          <button onClick={addEntry} style={{ width: '100%', padding: '14px', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>+ ADD CUSTOMER</button>
        </div>
        <h3 style={{ color: '#5f6368', marginTop: '25px' }}>Recent Transactions</h3>
        {customers.map(c => (
          <div key={c.id} style={{ background: 'white', padding: '15px', borderRadius: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '5px solid #1a73e8' }}>
            <div>
              <div style={{ fontWeight: '600', fontSize: '16px', color: '#202124' }}>{c.name}</div>
              <div style={{ fontSize: '12px', color: '#70757a' }}>{c.date}</div>
            </div>
            <div style={{ fontWeight: 'bold', color: '#d93025', fontSize: '18px' }}>₹{c.balance}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
