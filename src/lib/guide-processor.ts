export interface TocItem {
    id: string;
    title: string;
    level: number;
}

export interface ProcessedGuide {
    html: string;
    toc: TocItem[];
}

export function processGuideContent(markdown: string): ProcessedGuide {
    const toc: TocItem[] = [];
    let processed = markdown;

    // 1. Remove PDF Artifacts
    // Remove "## Page X" or "Page X" headers commonly found in PDF extractions
    processed = processed.replace(/^## Page \d+$/gm, '');
    processed = processed.replace(/^Page \d+$/gm, '');

    // Remove horizontal rules often used as page separators
    processed = processed.replace(/^---$/gm, '');

    // Remove the "content extracted" blockquote if present at the top
    processed = processed.replace(/^> This content was extracted.*/gm, '');

    // 2. Enhance Headers & Build TOC
    // We want to turn "MODULE X - Title" into proper h2s with IDs
    // And standard headers into h2/h3

    // First, normalize "MODULE" headers to H2 if they aren't already
    // The raw text often has "MODULE 1- The Startup..." without markdown headers
    processed = processed.replace(/^(MODULE \d+[-:]\s*.*$)/gim, '## $1');

    // Also handle "ABOUT THIS LESSON" as a sub-header or callout. 
    // We'll wrap it in a custom div for styling later, but for now let's ensure it doesn't break flow.
    // Actually, let's treat "ABOUT THIS LESSON" as a block we might want to style differently.
    // For now, let's just make it bold/small.
    processed = processed.replace(/^ABOUT THIS LESSON/gim, '**About This Lesson**');

    // Process headers to add IDs and build TOC
    const lines = processed.split('\n');
    const outputLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Match headers #, ##, ###
        const headerMatch = line.match(/^(#{1,3})\s+(.*)$/);
        if (headerMatch) {
            const level = headerMatch[1].length;
            const title = headerMatch[2].trim();

            // Skip empty titles or "Page X" if they snuck through
            if (!title || title.match(/^Page \d+$/)) continue;

            // Generate ID
            const id = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            // Add to TOC if it's H1 or H2 (Modules are usually H2 in this context)
            if (level <= 2) {
                toc.push({ id, title, level });
            }

            // Replace line with HTML version including ID
            // Using a simple convention we can style with CSS later or standard HTML
            outputLines.push(`<h${level} id="${id}">${title}</h${level}>`);
            continue;
        }

        outputLines.push(line);
    }

    processed = outputLines.join('\n');

    // 3. Formatting Content

    // Bold: **text**
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic: *text* (be careful not to match bullet points)
    processed = processed.replace(/([^*])\*([^*]+)\*/g, '$1<em>$2</em>');

    // Bullet points: lines starting with • or -
    // We need to wrap them in <ul>. This is a simple state machine.
    const listProcessedLines: string[] = [];
    let inList = false;

    const contentLines = processed.split('\n');
    for (let i = 0; i < contentLines.length; i++) {
        let line = contentLines[i].trim();

        // Check for bullet points (• or - at start)
        const isBullet = /^([•\-])\s+(.*)$/.exec(line);

        if (isBullet) {
            if (!inList) {
                listProcessedLines.push('<ul class="list-disc pl-6 space-y-2 mb-4">');
                inList = true;
            }
            listProcessedLines.push(`<li>${isBullet[2]}</li>`);
        } else {
            if (inList) {
                listProcessedLines.push('</ul>');
                inList = false;
            }
            // If it's not a list item, just add the line
            // But if it's empty, we might want to ensure paragraphs
            if (line.length > 0 && !line.startsWith('<h')) {
                // Determine if this is a paragraph.
                // If the previous line was also text, it's part of the same paragraph? 
                // Markdown usually needs empty line for new paragraph.
                // For simplicity in this specific dataset, we can treat non-empty, non-header lines as paragraphs 
                // if they are surrounded by empty lines.
                // Let's just wrap in <p> if it's not HTML tag
                if (!line.startsWith('<')) {
                    listProcessedLines.push(`<p class="mb-4 text-muted-foreground leading-relaxed">${line}</p>`);
                } else {
                    listProcessedLines.push(line);
                }
            }
        }
    }
    if (inList) {
        listProcessedLines.push('</ul>');
    }

    processed = listProcessedLines.join('\n');

    return { html: processed, toc };
}
