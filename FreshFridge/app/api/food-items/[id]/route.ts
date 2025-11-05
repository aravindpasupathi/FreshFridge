import { NextRequest, NextResponse } from 'next/server';
import { supabaseService } from '@/lib/supabase-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await supabaseService.getFoodItem(params.id);
    
    if (!item) {
      return NextResponse.json({ error: 'Food item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching food item:', error);
    return NextResponse.json({ error: 'Failed to fetch food item' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // Convert camelCase to snake_case if needed
    const updates: any = {};
    if (body.expiryDate) updates.expiry_date = body.expiryDate;
    if (body.imageUrl !== undefined) updates.image_url = body.imageUrl;
    if (body.name !== undefined) updates.name = body.name;
    if (body.category !== undefined) updates.category = body.category;
    if (body.emoji !== undefined) updates.emoji = body.emoji;
    if (body.quantity !== undefined) updates.quantity = body.quantity;
    if (body.unit !== undefined) updates.unit = body.unit;
    if (body.confidence !== undefined) updates.confidence = body.confidence;
    if (body.notes !== undefined) updates.notes = body.notes;
    
    const updatedItem = await supabaseService.updateFoodItem(params.id, updates);
    
    if (!updatedItem) {
      return NextResponse.json({ error: 'Food item not found' }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating food item:', error);
    return NextResponse.json({ error: 'Failed to update food item' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await supabaseService.deleteFoodItem(params.id);
    
    if (!success) {
      return NextResponse.json({ error: 'Food item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error('Error deleting food item:', error);
    return NextResponse.json({ error: 'Failed to delete food item' }, { status: 500 });
  }
}
