import { Link } from 'expo-router';
import React from 'react';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';

export default function Page() {
    return (
        <ThemedView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <ThemedText style={{ fontSize: 24 }}>
                This is the tabs index page.
            </ThemedText>
            <Link href="#">Go to the first tab</Link>
        </ThemedView>
    );
}
