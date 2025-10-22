package com.rin.booknet.feature.book.entity;

import com.rin.booknet.util.BaseEntity;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Book extends BaseEntity {
    String title;
    String author;
    String imageUrl;
}
