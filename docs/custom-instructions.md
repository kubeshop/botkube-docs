---
id: custom-instructions
title: Custom instructions
sidebar_position: 6
---

# Custom instructions

Fuse categorizes user prompts and applies custom AI assistant instructions for accurate responses.

There are built-in instructions for some scenarios. You can learn more about them on the [Tutorials](./tutorials.md) page. However, you can also create your own, to tailor Fuse to your specific workflows and daily tasks.

The custom instructions are applied dynamically. The AI model decides by itself whether to apply a given instruction, based on its relevance to the user prompt.

The custom instructions require an active account on Botkube Cloud. All custom instructions are shared across all Fuse installations within your Botkube Cloud organization.

## Browse and manage instructions

To browse and manage available instructions, run:

```shell
fuse instructions browse
```

Then:

- Navigate with up/down arrows through the list.
- Filter the list with your search phrase after pressing `/`.
- Press `e` to edit selected instruction.
- Press `d` to delete selected instruction.
- Press `a` to add [a new instruction](#add-a-new-instruction).

## Add a new instruction

To add a new custom instruction, run:

- Using the default instruction template:

  ```shell
  fuse instructions add
  ```

- From a local file:

  ```shell
  fuse instructions add file.md
  ```

- From a URL:

  ```shell
  fuse instructions add https://example.com/file.md
  ```

### Custom instruction content

The custom instruction must be a valid Markdown file, that contain a display name as a part of frontmatter metadata:

```md
---
displayName: display-name # short name for the instruction
---
```

While there aren't any further requirements for the Markdown instruction content, we recommend using the official default template ([available in the `fuse instructions add` command](#add-a-new-instruction)).

The instruction might contain some broad guidelines, but also more specific, step-by-step, instructions.

You can learn more about writing the instructions by searching for "prompt engineering" in the web.
