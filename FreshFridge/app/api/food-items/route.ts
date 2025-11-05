import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase-service';

export async function GET() {
  try {
    const items = await supabaseService.getAllFoodItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching food items:', error);
    return NextResponse.json({ error: 'Failed to fetch food items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.category || !body.emoji || !body.expiryDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert camelCase to snake_case for Supabase
    const foodItem = await supabaseService.addFoodItem({
      name: body.name,
      category: body.category,
      emoji: body.emoji,
      expiry_date: body.expiryDate,
      quantity: body.quantity || 1,
      unit: body.unit || 'piece',
      image_url: body.imageUrl,
      confidence: body.confidence,
      notes: body.notes,
    });

    if (!foodItem) {
      return NextResponse.json({ error: 'Failed to create food item' }, { status: 500 });
    }

    return NextResponse.json(foodItem, { status: 201 });
  } catch (error) {
    console.error('Error creating food item:', error);
    return NextResponse.json({ error: 'Failed to create food item' }, { status: 500 });
  }
}
