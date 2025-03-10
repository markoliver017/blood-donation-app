import React from 'react';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';

export default function Create() {
    return (
        <ThemedView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <ThemedText style={{ fontSize: 24 }}>
                This is the create page.
            </ThemedText>
        </ThemedView>
    );
}
